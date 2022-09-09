import React from 'react';

const ButtonPayment = () => {
    
// console.log(process.env.REACT_APP_SERVER_URL);


    function clicked(){
        fetch('/create-checkout-session', {
            method: 'POST',
            headers : {
                'Content-type': 'application/json'
            },
            body : JSON.stringify({
                items: [
                    { id:1, quantity:2 },
                    { id:2, quantity:2 }
                ]
            })
        }).then(res => {
            if(res.ok) return res.json();
            return res.json().then(json => Promise.reject(json));
        }).then(({url}) => {
            // console.log(url);
            window.location = url;
        }).catch( e => {
            console.log( e.error );
        })
    }

    return (
      <button onClick={clicked}>
        bouton
      </button>
    );
};

export default ButtonPayment;