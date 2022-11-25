
import * as R from "ramda"
import React, {useState, useContext, useCallback, useEffect} from 'react';
import { SocketContext } from "../socket-context";

const Payer = () => {
    
        const products = 
        [
            { params : { productID:2, quantity:2 }}
        ]
        const socket = useContext(SocketContext);

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
                console.log(url + " " + error);
            });
        }

    return (
        <button onClick={sendRequestPayment}>
            CLICK MOI PAIE MOI
        </button>
    )
};


export default Payer;
