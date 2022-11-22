const express = require("express")
const mongoose = require("mongoose")
const app = express()
const products = require("./data.js")
const products_routes = require("./routes/products.js")
const PORT = 8080

require("dotenv").config()


const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


  io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

    io.on('test', (socket)=> {
        console.log("test")
    })

    io.emit('test')
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Listening on port ${PORT}`)
    app.listen(PORT)
  })

  .catch((err) => {
    console.log("Impossible de démarrer le serveur !")
    console.log(Error)
  })

app.use(express.json())
app.use("/api/products", products_routes)
