require("dotenv").config()
const Product = require('../models/Product.js')
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);

/* 
 *  Create stripe account customer 
 */
const createStripeCustomer = async (user) => {
  return await stripe.customers.create({
    email : user.email,
    name : user.pseudo,
  });
}

/* 
 *  Create stripe coupon
 */
const createStripeCoupon = () => {
  expire = new Date(Date.now());
  expire.setDate(expire.getDate()+7);

  return stripe.coupons.create({
    percent_off: 50,
    redeem_by: expire,
    max_redemptions : 1,
    description : "50% de réduction la première semaine après la création de votre compte !"
  });
}


/* 
 *  Get Payment Link of a Stripe Object
 */
async function getStripeCheckoutSessionUrlFromStripeObject(stripeObject){
  return stripe.checkout.sessions.create(stripeObject).then((stripeData) => {
    return stripeData.url;
  })
}


/* 
 *  Get Payment Link of a Premium Stripe Object
 */
async function getStripeCheckoutSessionUrlFromPremiumStripeObject(subscription, cusId){
  const stripeObject = requestPremiumSubscriptionStripeObject(subscription, cusId)
  
  return await stripe.checkout.sessions.create(stripeObject).then((stripeData) => {
    return stripeData.url;
  })
}

/* 
 *  Get Payment Link of a Premium LIFE Stripe Object
 */
async function getStripeCheckoutSessionUrlFromPremiumLifeStripeObject(subscription, cusId){
  const stripeObject = requestPremiumLifeSubscriptionStripeObject(subscription, cusId)
  
  return await stripe.checkout.sessions.create(stripeObject).then((stripeData) => {
    return stripeData.url;
  })
}



/* 
 *  Get Payment Link of products
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

async function deleteSubscriptionStripeById(subId) {
  const deleted =  await stripe.subscriptions.del(subId);
}

/* 
 *  Searching among existants products 
 *  and create the object request
 */
async function requestSessionCheckoutStripeUrl(products) {
  return Product.find().then( (data) => {
    const stripeObject = requestStripeCheckoutObject(products, data);
    return createStripeCheckoutSessionUrl(stripeObject);
  });
}

/*
 *  Return Url sended by Stripe 
 */
async function createStripeCheckoutSessionUrl(object) {
    return await stripe.checkout.sessions.create(object).then((stripeData) => {
      return stripeData.url;
    })
}

/*
 *  Return payment intent list from a customer
 */
async function searchStripePaymentIntentPaidByCusId(cusId) {
  return await stripe.paymentIntents.search({
    query: 'customer:\''+cusId+'\' AND status:\'succeeded\'',
  });
}

/*
 *  Return subscription list from a customer
 */
async function searchStripeSubscriptionPaidByCusId(cusId) {
  return await stripe.subscriptions.list({
    customer : cusId,
    status : "active"
  });
}

/* 
 *  Object request to send to Stripe
 */
function requestStripeCheckoutObject(buy_products, products_data) {
  return {
    payment_method_types: ["card"],
    mode: "payment",
    //Products list of consumer
    line_items: buy_products.map((product) => {
      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: products_data[product.id].name,
          },
          unit_amount: products_data[product.id].price, //in cents
        },
        quantity: product.quantity,
      };
    }),
    success_url: `http://localhost:3000/nevada/main/payment/paymentAccepted`, // TODO : update URL
    cancel_url: `http://localhost:3000/nevada/main/payment/paymentRefused`, // TODO : update URL (idea : sended by client side ?)
  };
}


/* 
 * Create an premium subscription Object
 * for Stripe Api request
 */ 
const requestPremiumSubscriptionStripeObject = (sub, cusId) => {
  return {
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
              product_data : {
                  name : "Premium subscription",
                  description : "Devenez premium et obtenez des avantages !"
              },
              recurring : {
                  interval : "month"
              },
              unit_amount : sub.price, //in cents
              currency:"eur",
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: sub.success_url,
      cancel_url: sub.cancel_url,
      customer: cusId
    }
}


/* 
 * Create an premium LIFE subscription Object
 * for Stripe Api request
 */ 
const requestPremiumLifeSubscriptionStripeObject = (sub, cusId) => {
  return {
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
              product_data : {
                  name : "Premium subscription",
                  description : "Devenez premium à vie et obtenez des avantages !"
              },
              unit_amount : sub.price, //in cents
              currency:"eur",
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: sub.success_url,
      cancel_url: sub.cancel_url,
      customer: cusId
    }
}


module.exports = { 
  getStripeCheckoutSessionUrl,
  getStripeCheckoutSessionUrlFromStripeObject,
  getStripeCheckoutSessionUrlFromPremiumStripeObject,
  getStripeCheckoutSessionUrlFromPremiumLifeStripeObject,
  createStripeCustomer,
  searchStripeSubscriptionPaidByCusId,
  searchStripePaymentIntentPaidByCusId,
  deleteSubscriptionStripeById
}