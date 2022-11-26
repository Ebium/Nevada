require("dotenv").config()
const Product = require('../models/Product.js')
const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);

/* 
 *  Obtiens l'url de paiement des produits
 */
async function getStripeCheckoutSessionUrl(products) {
    var url;
    var error="";
    try {
        url = await requestSessionCheckoutStripeUrl(products);
    } catch(e) {
        console.log(e);
        error = "Un problème interne est survenu.";
    }
  return {url, error};
}

/* 
 *  Cherche parmi les produits existants et créer l'objet de la requête
 */
async function requestSessionCheckoutStripeUrl(products) {
    //Cherche tous les produits
  return Product.find().then( (data) => {
    const stripeObject = requestStripeCheckoutObject(products, data);
    return createStripeCheckoutSessionUrl(stripeObject);
  });
}

/* 
 *  Renvoie l'url donnée par stripe
 */
async function createStripeCheckoutSessionUrl(object) {
    return stripe.checkout.sessions.create(object).then((stripeData) => {
      return stripeData.url;
    })
}


/* 
 *  Requête type object à envoyer à Stripe
 */
function requestStripeCheckoutObject(buy_products, products_data) {
  return {
    payment_method_types: ["card"],
    mode: "payment",
    //liste des produits à faire payer au consommateur
    line_items: buy_products.map((product) => {
      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: products_data[product.id].name,
          },
          unit_amount: products_data[product.id].price, //unité en centime
        },
        quantity: product.quantity,
      };
    }),
    success_url: `http://localhost:3000/nevada/payment/success.html`, // A mettre à jour...
    cancel_url: `http://localhost:3000/nevada/home`, // A mettre à jour... peut etre se faire envoyer côté client ?
  };
}


module.exports = { getStripeCheckoutSessionUrl }