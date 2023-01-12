import { io } from "socket.io-client";
import JWT from "expo-jwt"

//Create a new socket
const createSocket = () =>  {
  const token = !localStorage.getItem("Nevada_Token") ? JWT.encode({},"error") : localStorage.getItem("Nevada_Token")
  return io("http://localhost:5050", {
    autoConnect : true,
    reconnection : false,
    query: {
      token: token,
  }
})
}

//client socket
var socket = createSocket().connect()

//Reload our client socket
const reloadSocket = () => {
  socket = createSocket().connect()
}

export { socket, reloadSocket }



