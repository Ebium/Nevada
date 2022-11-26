
import { useEffect } from 'react';
import { socket } from "../socket-context";

const Payer = () => {
    
        const products = 
        [
            { id :0, quantity:1 },
            { id :1, quantity:3 }
        ]

        useEffect( () => {
            receivedPaymentLink();
        }
        ,[])

        function sendRequestPayment(){
            socket.emit("pay_products", products);
        }

        function receivedPaymentLink(){
            socket.on("pay_products", ( { url, error} ) => {
                if(error) 
                    console.log(error);
                else
                    window.location = url;
            });
        }

    return (
        <button onClick={sendRequestPayment}>
            Payer
        </button>
    )
};


export default Payer;
