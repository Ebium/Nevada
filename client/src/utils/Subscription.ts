import { socket } from "../socket-context"

const subscriptionAcceptedUrl = `http://localhost:3000/nevada/main/payment/paymentAccepted`
const subscriptionRefusedUrl = `http://localhost:3000/nevada/main/payment/paymentRefused`

/*
 * Request to server an url for subscription premium payment
 * and redirect the website to this url
 */
const getPremiumSubscriptionUrl = async (price: number) => {
  const subscription = {
    success_url: subscriptionAcceptedUrl,
    cancel_url: subscriptionRefusedUrl,
    price: price, //in cents
  }
  socket.emit("Premium subscription", subscription)
  socket.on("Premium subscription", async (redirectionPaymentUrl) => {
    window.location.href = redirectionPaymentUrl
  })
}

/*
 * Request to server an url for subscription premium LIFE payment
 * and redirect the website to this url
 */
const getPremiumLifeSubscriptionUrl = async (price: number) => {
  // const donateStripeObject = createPremiumSubscriptionStripeObject(price)
  const payment = {
    success_url: subscriptionAcceptedUrl,
    cancel_url: subscriptionRefusedUrl,
    price: price, //in cents
  }
  socket.emit("Premium life subscription", payment)
  socket.on("Premium life subscription", async (redirectionPaymentUrl) => {
    window.location.href = redirectionPaymentUrl
  })
}

/*
 * Request to server to unsubscribe
 * the premium user
 */
const requestPremiumUnsubscription = async () => {
  socket.emit("User unsubscription")
  socket.on("User unsubscription", () => {
    window.location.assign("/nevada/main/home")
  })
}

export {
  getPremiumSubscriptionUrl,
  getPremiumLifeSubscriptionUrl,
  requestPremiumUnsubscription,
}
