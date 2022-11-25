const express = require("express")
const mongoose = require("mongoose")
const app = express()
const cors = require("cors")
const products_routes = require("./routes/products.js")


const PORT = 5050

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}


require("dotenv").config()

const Stripe = require("stripe")
const stripe = Stripe("sk_test_51LrLO9JE1Vl9aUiyElWtRFhpLB7oDE5YwmL8h1YFgniEhyugNAiUhlFBzg8qLusFLIzchw9SdDF0QFRlKVudQcDB00T9BwLpiT");
const socketIo = require("socket.io")
const http = require("http")
const { getProduct } = require("./controllers/products.js")
const server = http.createServer(app)

const io = socketIo(server,{ 
    cors: {
      origin: ["http://localhost:3000", "http://localhost:3000/nevada/game"]
    }
})

console.log(stripe.checkout.sessions.create)
io.on("connection",(socket)=>{
  console.log("client connected: ",socket.id)

  socket.on("pay_products", async(products) => {
    var url;
    var error;
    
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: products.map(product => {
          // Récupération des produits depuis la database
          var product_data;
          
          console.log(getProduct(product));
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: product_data.name,
              },
              unit_amount: product_data.price, //in cents
            },
            quantity: product.params.quantity,
          }
        }),
        success_url: `http://localhost:3000/nevada/payment/success.html`, // A mettre à jour...
        cancel_url: `http://localhost:3000/nevada/game`, // A mettre à jour...
      })
      url = session.url;
      console.log(url);
      console.log(session);
    } catch (e) {
      error = e.error;
      console.log(e.message)
    }

    socket.emit("pay_products", { url, error});

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
