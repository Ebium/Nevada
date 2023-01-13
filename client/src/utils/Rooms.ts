import { socket } from "../socket-context"
const baseURL = "http://localhost:3000/nevada/game/"

export const createRoom = () => {
  socket.emit("Create a new room", localStorage.getItem("Nevada_Token"))
}

export const getServerResponse = () => {
  socket.on("Create a new room", (roomId, isCreated) => {
    if (isCreated) {
      window.location.href = baseURL + roomId
    } else alert("An internal problem has occurred.")
  })
}
