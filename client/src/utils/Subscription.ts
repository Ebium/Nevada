import { socket } from '../socket-context';

const subscriptionAcceptedUrl = `http://localhost:3000/nevada/main/payment/paymentAccepted`
const subscriptionRefusedUrl = `http://localhost:3000/nevada/main/payment/paymentRefused`


/*
 * Request to server an url for subscription premium payment
 * and redirect the website to this url
 */ 
export const getPremiumSubscriptionUrl = async() => {
    const donateStripeObject = createPremiumSubscriptionStripeObject()
    socket.emit("Premium subscription", donateStripeObject)
    socket.on("Premium subscription", async(redirectionPaymentUrl) => {
       window.location.href = redirectionPaymentUrl
    })
    
}

/* 
 * Create an Object that will be send to server
 * for Stripe Api request
 */ 
const createPremiumSubscriptionStripeObject = () => {
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
                unit_amount : 1999, //in cents
                currency:"eur",
            },
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: subscriptionAcceptedUrl,
        cancel_url: subscriptionRefusedUrl,
      }
}
