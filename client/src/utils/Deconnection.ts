import { socket } from '../socket-context';
import React from 'react';

/*
 * Request to server an url for donation payment
 * and redirect the website to this url
 */ 
const userDisconnect = () => {
    localStorage.removeItem("Nevada_Token")
    socket.disconnect()
    window.location.assign("/nevada/main/home")
}

export  { userDisconnect }