import socketio from "socket.io-client";
import { io } from "socket.io-client"
import React from "react";
import { createContext } from "react";

export const socket = io("http://localhost:5050");
export const SocketContext = React.createContext(socket);
