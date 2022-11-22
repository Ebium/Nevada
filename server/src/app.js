const express = require("express")
const mongoose = require("mongoose")
const app = express()
const products = require("./data.js")
const products_routes = require("./routes/products.js")
const PORT = 8080

require("dotenv").config()

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
