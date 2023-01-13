const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const app = express()
const cors = require("cors")
const products_routes = require("./routes/products.js")
const users_routes = require("./routes/users.js")
const general_routes = require("./routes/general.js")
const {
  getStripeCheckoutSessionUrl,
  getStripeCheckoutSessionUrlFromPremiumStripeObject,
  getStripeCheckoutSessionUrlFromPremiumLifeStripeObject,
  getStripeCheckoutSessionUrlFromStripeObject,
} = require("./controllers/payment")
const {
  registerValidUser,
  loginUserAuth,
  findUserBySocketId,
  userPayment,
  userUnsubscribe,
  updateUser,
} = require("./controllers/users")
const {
  createRoom,
  updateANewPlayerRoom,
  updateAQuitPlayerRoom,
  clearRooms,
  roomExist,
  deleteRoom,
} = require("./controllers/room.js")
var spectatorsCounter = 0

const PORT = 5050

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

require("dotenv").config()

const socketIo = require("socket.io")
const http = require("http")
const server = http.createServer(app)

const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
})

/*
 * When we launch the server or reset the server
 * Rooms should not exist
 */
clearRooms()

/*
 *  client/server : authentification user account request
 */
io.use(function (socket, next) {
  if (socket.handshake.query) {
    jwt.verify(
      socket.handshake.query.token,
      process.env.JWT_SECRET,
      async (err, decoded) => {
        //format incorrect
        if (
          err ||
          decoded == undefined ||
          decoded.isRegistered == null ||
          decoded.email == null ||
          decoded.password == null
        ) {
          next(new Error("not_connected"))
          return
        }
        decoded.socketId = socket.id

        //signup
        if (decoded.isRegistered == false) {
          const result = await registerValidUser(decoded)
          if (result == null || result.user == null) {
            if (result.errors.email != null) {
              next(
                new Error("This email already exists", { cause: result.errors })
              )
              return
            }
            if (result.errors.pseudo != null) {
              next(
                new Error("This pseudonym already exists.", {
                  cause: result.errors,
                })
              )
              return
            }
          }
          console.log("new user registered : " + decoded.email)
        }

        //connection
        if (decoded.isRegistered == true) {
          var user = decoded
          user.socketId = socket.id
          user.sockets = io.sockets.sockets
          const result = await loginUserAuth(user)
          if (typeof result == "string") {
            next(new Error(result)) // email or password incorrect
            return
          }
          console.log("user connected : ", decoded.email)
        }
        next()
      }
    )
  } else {
    next(new Error("Authentication vide"))
  }
})

/*
 *  client/server : client connection
 */
io.on("connection", (socket) => {
  socket.on("disconnect", (reason) => {
    console.log(reason)
  })
})

/*
 *  client/server : room request
 */
io.on("connection", (socket) => {
  var currentRoomId = undefined
  var usersRoom = []
  var playersRoom = []
  var gameStarted = false

  socket.on("Create a new room", async () => {
    const room = await createRoom({ red: socket.id, blue: "" })
    if (room._id) socket.emit("Create a new room", room._id, true)
    else socket.emit("Create a new room", undefined, false)
  })

  socket.on("Join a room", async (roomId) => {
    const roomFound = await roomExist(roomId)

    //La room n'existe pas
    if (roomFound == false) {
      socket.emit(
        "Room invalid",
        "This room does not exist or the game finished"
      )
      return
    }

    const room = await updateANewPlayerRoom(
      { _id: mongoose.Types.ObjectId(roomId) },
      socket.id
    )

    if (room.modifiedCount) {
      //mise à jour des données en local
      socket.join(roomId)
      currentRoomId = roomId
      const allRooms = await io.sockets.adapter.rooms.get(currentRoomId)
      usersRoom = Array.from(allRooms)

      //envoi qu'il a bel et bien rejoint
      socket.emit("Join a room", true, roomId)
      io.to(currentRoomId).emit("An user joined the room", usersRoom)
    } else socket.emit("Join a room", false, "")


    //Si 2 premiers joueurs, mettre à jour le tab des joueurs
    if (usersRoom.length <= 2 && playersRoom.length != 2) {
      playersRoom = usersRoom.slice(0, 2)
      console.log("je rentre avec : ",socket.id)
      console.log(playersRoom.length)
      socket.emit("update playerId", (playersRoom.length - 1) )
    }

    //si un spectateur envoie les données du board
    if (usersRoom.length > 2) {
      io.to(usersRoom[0]).emit("retrieve board", socket.id)
    }

    if (playersRoom.length == 2) {
      console.log("aloa : ", playersRoom)
      io.to(currentRoomId).emit("2 players server side", playersRoom)
    }

    if (usersRoom.length >= 2) {
      const user1 = await findUserBySocketId(usersRoom[0])
      const user2 = await findUserBySocketId(usersRoom[1])
      io.to(currentRoomId).emit("players info", user1, user2)
    }
  })

  socket.on(
    "placePad",
    (historyBoard, pads, graphicPads, updatedBoard, updatedPadStore) => {
      io.to(currentRoomId).emit(
        "place board",
        historyBoard,
        pads,
        graphicPads,
        updatedBoard,
        updatedPadStore
      )
    }
  )

  socket.on(
    "undo pad",
    (historyBoard, pads, graphicPads, updatedBoard, updatedPadStore) => {
      io.to(currentRoomId).emit(
        "undo board",
        historyBoard,
        pads,
        graphicPads,
        updatedBoard,
        updatedPadStore
      )
    }
  )

  socket.on("reset board", () => {
    io.to(currentRoomId).emit("reset board")
  })

  socket.on(
    "MakeMove",
    (newMovesHistory, movesCount, board, disabledIndexPads, pads) => {
      io.to(currentRoomId).emit(
        "emitMakeMove",
        newMovesHistory,
        movesCount,
        board,
        disabledIndexPads,
        pads
      )
    }
  )

  socket.on("update current pad", (padName) => {
    io.to(currentRoomId).emit("emit update current pad", padName)
  })

  socket.on("pad rotated", () => {
    io.to(currentRoomId).emit("emit pad rotated")
  })


  socket.on("update game phase", (phase) => {
    io.to(currentRoomId).emit("emit update game phase", phase)
  })

  socket.on("2 players server side", (players) => {
    playersRoom = players
    gameStarted = true
  })

  socket.on("placePad", (historyBoard, pads, graphicPads, updatedBoard) => {
    io.to(currentRoomId).emit(
      "board",
      historyBoard,
      pads,
      graphicPads,
      updatedBoard
    )
  })

  socket.on(
    "MakeMove",
    (newMovesHistory, movesCount, board, disabledIndexPads, pads) => {
      io.to(currentRoomId).emit(
        "emitMakeMove",
        newMovesHistory,
        movesCount,
        board,
        disabledIndexPads,
        pads
      )
    }
  )


  // client : jeu
  socket.on("GameStarted", async () => {
    io.to(currentRoomId).emit("emitGameStarted")

    gameStarted = true
    const player1 = await findUserBySocketId(playersRoom[0])
    const player2 = await findUserBySocketId(playersRoom[1])

    var player1Edited = player1
    var player2Edited = player2

    player1Edited.played += 1
    player2Edited.played += 1

    await updateUser(player1Edited)
    await updateUser(player2Edited)
  })

  //envoie les données du plateau
  socket.on("send board game", (board, game, socketId) => {
    io.to(socketId).emit("update board game", board, game)
  })

  //un joueur a gagné la partie
  socket.on("Winner room", async (playerId, winnerPseudo) => {
    deleteRoom(currentRoomId)

    //la partie avait commencé
    if (gameStarted && playerId != -1) {
      console.log("winner id : ",playersRoom[playerId])
      const user = await findUserBySocketId(playersRoom[playerId])
      var userEdited = user
      console.log("winner user : ",user)
      userEdited.won += 1
      updateUser(user)
      io.in(currentRoomId).emit("Winner user", winnerPseudo.pseudo)
      io.in(currentRoomId).socketsLeave(currentRoomId)
    } 
    if(gameStarted && playerId==-1) {
      io.in(currentRoomId).emit("Winner user", "")
      io.in(currentRoomId).socketsLeave(currentRoomId)
    }
  })

  // quand un joueur appuie sur forfait
  socket.on("Player abandon", () => {
    deleteRoom(currentRoomId)
    io.to(currentRoomId).emit("Player abandon", playersRoom.indexOf(socket.id))
  })

  socket.on("disconnect", async () => {
    if (currentRoomId != undefined) {
      // si c'est un joueur
      if (playersRoom.includes(socket.id)) {
        await deleteRoom(currentRoomId)
        io.to(currentRoomId).emit(
          "Player abandon",
          playersRoom.indexOf(socket.id)
        )
      }

      //envoi à tout le monde qu'un utilisateur s'est déconnecté
      socket.leave(currentRoomId)
      await updateAQuitPlayerRoom(
        { _id: mongoose.Types.ObjectId(currentRoomId) },
        socket.id
      )
      io.to(currentRoomId).emit("An user has left the room", usersRoom)
    }

    socket.on("disconnect", async () => {
      if (currentRoomId != undefined) {
        await updateAQuitPlayerRoom(
          { _id: mongoose.Types.ObjectId(currentRoomId) },
          socket.id
        )
        io.to(currentRoomId).emit(
          "An user has left the room",
          Array.from(usersRoom)
        )
      }
    })
  })
})

/*
 *  client/user : payment request
 */
io.on("connection", async (socket) => {
  socket.on("pay_products", async (products) => {
    socket.emit("pay_products", await getStripeCheckoutSessionUrl(products))
  })
  socket.on("Donate", async (donateStripeObject) => {
    const donationUrl = await getStripeCheckoutSessionUrlFromStripeObject(
      donateStripeObject
    )
    socket.emit("Donate", donationUrl)
  })
  socket.on("Premium subscription", async (subscription) => {
    const user = await findUserBySocketId(socket.id)
    const subscriptionUrl =
      await getStripeCheckoutSessionUrlFromPremiumStripeObject(
        subscription,
        user.cusId
      )
    socket.emit("Premium subscription", subscriptionUrl)
  })

  socket.on("Premium life subscription", async (subscription) => {
    const user = await findUserBySocketId(socket.id)
    const subscriptionUrl =
      await getStripeCheckoutSessionUrlFromPremiumLifeStripeObject(
        subscription,
        user.cusId
      )
    socket.emit("Premium life subscription", subscriptionUrl)
  })

  socket.on("User unsubscription", async () => {
    const user = await findUserBySocketId(socket.id)
    userUnsubscribe(user)
    socket.emit("User unsubscription")
  })

  socket.on("User become premium", async () => {
    const user = await findUserBySocketId(socket.id)
    userPayment(user)
  })
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Listening on port ${PORT}`)
    server.listen(PORT)
  })

  .catch((err) => {
    console.log("Impossible de démarrer le serveur !")
    console.log(err)
  })

app.use(express.json())
app.set("socketio", io)
app.set("spectatorsCounter", spectatorsCounter)
app.use("/users", cors(corsOptions), users_routes)
app.use("/general", cors(corsOptions), general_routes)
app.use("/api/products", cors(corsOptions), products_routes)
