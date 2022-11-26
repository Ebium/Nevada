const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const products_routes = require("./routes/products.js")
const { getStripeCheckoutSessionUrl } = require("./controllers/payment")
const { createValidUser, updateUserSocketId } = require("./controllers/users") 

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
 *  client/server : user request
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
    const result = await updateUserSocketId(user);
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