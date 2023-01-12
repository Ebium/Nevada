const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const app = express()
const cors = require("cors")
const products_routes = require("./routes/products.js")
const users_routes = require("./routes/users.js")
const { getStripeCheckoutSessionUrl, getStripeCheckoutSessionUrlFromStripeObject } = require("./controllers/payment")
const { registerValidUser, loginUserAuth } = require("./controllers/users") 
const { createRoom, updateANewPlayerRoom, updateAQuitPlayerRoom, clearRooms } = require("./controllers/room.js")

const PORT = 5050

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

require("dotenv").config() 

const socketIo = require("socket.io")
const http = require("http")
const server = http.createServer(app)

const io = socketIo(server,{ 
    cors: {
      origin: ["http://localhost:3000"]
    }
})

/* 
 * When we launch the server or reset the server
 * Rooms should not exist
 */
// clearRooms()

/*
 *  client/server : authentification user account request
 */
io.use(function (socket, next){
  if (socket.handshake.query){
    jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, async (err, decoded) => {
      //format incorrect
      if(err ||  decoded==undefined || decoded.isRegistered == null || decoded.email == null || decoded.password == null ) {
        next(new Error("not_connected"))
        return
      }
      decoded.socketId = socket.id

      //signup
      if(decoded.isRegistered==false) {
        const result = await registerValidUser(decoded);
        if(result==null || result.user==null)  { 
          if(result.errors.email != null) {
            next(new Error("This email already exists", { cause : result.errors}))
            return
          }
          if(result.errors.pseudo != null) {
            next(new Error("This pseudonym already exists.", { cause : result.errors}))
            return
          }
        }
        console.log("new user registered : "+ decoded.email)
      }      

      //connection 
      if(decoded.isRegistered==true) {
        var user = decoded
        user.socketId = socket.id 
        user.sockets = io.sockets.sockets
        const result = await loginUserAuth(user);
        if(typeof result == "string" ) {
          next(new Error(result)) // email or password incorrect
          return
        } 
        console.log("user connected : ", decoded.email)
      }
      next();
    });
  }
  else {
    next(new Error('Authentication vide'));
  }    
})

/*
 *  client/server : client connection
 */
io.on("connection",(socket)=>{
  console.log( io.sockets.sockets.get(socket.id).id)
  socket.on("disconnect",(reason)=>{
    console.log(reason)
  })
})

/*
 *  client/server : room request
 */
io.on("connection", (socket) => {
  var currentRoomId = undefined;
  var usersRoom = undefined;

  socket.on("Create a new room", async(player) => {
    const room = await createRoom({})
    if(room._id)
      socket.emit("Create a new room", room._id, true)
    else
      socket.emit("Create a new room", undefined, false)
  })

  socket.on("Join a room", async(roomId) => {
    const room = await updateANewPlayerRoom({ _id : mongoose.Types.ObjectId(roomId)}, socket.id)
    if(room.modifiedCount){
      
      socket.join(roomId)
      currentRoomId=roomId;
      usersRoom = await io.sockets.adapter.rooms.get(currentRoomId)

      socket.emit("Join a room", true)
      io.to(currentRoomId).emit("An user joined the room",  Array.from(usersRoom))
    } else
      socket.emit("Join a room", false)
  })

  socket.on("disconnect", async()=> {
    if(currentRoomId!=undefined) {
      await updateAQuitPlayerRoom({ _id : mongoose.Types.ObjectId(currentRoomId)},socket.id)
      io.to(currentRoomId).emit("An user has left the room",  Array.from(usersRoom))
    }
  })
})

/*
 *  client/user : payment request
 */
io.on("connection", (socket) => {
  socket.on("pay_products", async(products) => {
    socket.emit("pay_products", await getStripeCheckoutSessionUrl(products) );
  })
  socket.on("Donate", async(donateStripeObject)=> {
    const donationUrl = await getStripeCheckoutSessionUrlFromStripeObject(donateStripeObject)
    socket.emit("Donate", donationUrl);
  })
  socket.on("Premium subscription", async(subscriptionStripeObject)=> {
    const subscriptionUrl = await getStripeCheckoutSessionUrlFromStripeObject(subscriptionStripeObject)
    socket.emit("Premium subscription", subscriptionUrl);
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
app.use("/users", cors(corsOptions), users_routes)
app.use("/api/products", cors(corsOptions), products_routes)