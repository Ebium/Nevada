const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const products_routes = require("./routes/products.js")
const { getStripeCheckoutSessionUrl } = require("./controllers/payment")


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



io.on("connection",(socket)=>{
  console.log("client connected: ",socket.id)

  socket.on("pay_products", async(products) => {
    socket.emit("pay_products", await getStripeCheckoutSessionUrl(products) );
  })
  
  socket.on("disconnect",(reason)=>{

    console.log(reason)
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
