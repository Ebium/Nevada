const express = require('express')
const mongoose = require('mongoose')
const app = express()
const products = require('./data.js')
const products_routes = require('./routes/products.js')

require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
    .then((result) => {
        console.log("Listening on port 5000")
        app.listen(5000)})
        
    .catch((err) => console.log(Error))

app.use(express.json())
app.use('/api/products', products_routes)
