const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const products_routes = require("./routes/products.js")
const { getStripeCheckoutSessionUrl } = require("./controllers/payment")
const { createValidUser, updateUserAuth } = require("./controllers/users") 
const { createRoom, updateANewPlayerRoom, updateAQuitPlayerRoom } = require("./controllers/room.js")

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
 *  client/server : user account request
 */
io.on("connection",(socket)=>{
  console.log("client connected: ",socket.id)

  socket.on("Register a new user", async(user)=> {
    const result = await createValidUser(user);
    if(result.user==null) 
      socket.emit("Register a new user", result, false)
    else{
      socket.emit("Register a new user", result, true)
      console.log("new user registered : "+ user.email)
    } 
  })

  socket.on("Login an user", async(user)=> {
    const result = await updateUserAuth(user);
    if(!result.modifiedCount) 
      socket.emit("Login an user", result, false)
    else{
      socket.emit("Login an user", result, true)
      console.log("user connected : "+ user.email)
    } 
  })

  socket.on("Login an user", async(user)=> {
    const result = await updateUserAuth(user);

    if(!result.modifiedCount) 
      socket.emit("Login an user", result, false)
    else{
      socket.emit("Login an user", result, true)
      console.log("user connected : "+ user.email)
    } 
  })

  socket.on("disconnect",(reason)=>{
    console.log(reason)
  })
})

/*
 *  client/server : room request
 */
io.on("connection", (socket) => {
  var currentRoomId = undefined;

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
      socket.emit("Join a room", true)
    } else
      socket.emit("Join a room", false)
  })

  socket.on("disconnect", async()=> {
    if(currentRoomId!=undefined) {
      await updateAQuitPlayerRoom({ _id : mongoose.Types.ObjectId(currentRoomId)},socket.id)
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
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Listening on port ${PORT}`)
    server.listen(PORT)
  })

  .catch((err) => {
    console.log("Impossible de démarrer le serveur !")
    console.log(Error)
  })

app.use(express.json())
app.use("/api/products", cors(corsOptions), products_routes)