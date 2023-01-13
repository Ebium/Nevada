import { socket } from "../socket-context"

const donateAcceptedUrl = `http://localhost:3000/nevada/main/payment/paymentAccepted`
const donateRefusedUrl = `http://localhost:3000/nevada/main/payment/paymentRefused`

/*
 * Request to server an url for donation payment
 * and redirect the website to this url
 */
export const getDonateAmountUrl = async () => {
  const donateStripeObject = createDonateStripeObject()
  socket.emit("Donate", donateStripeObject)
  socket.on("Donate", async (redirectionPaymentUrl) => {
    window.location.href = redirectionPaymentUrl
    return redirectionPaymentUrl
  })
}

/*
 * Create an Object that will be send to server
 * for Stripe Api request
 */
const createDonateStripeObject = () => {
  return {
    submit_type: "donate",
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_1M9EO0JE1Vl9aUiympQjVnEc", //in cents
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: donateAcceptedUrl,
    cancel_url: donateRefusedUrl,
  }
}
