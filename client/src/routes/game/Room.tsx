import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { socket } from "../../socket-context"
import { updatePlayerId } from "../../store/ducks/Game.ducks"
import { useNevadaSelector } from "../../store/rootReducer"
import { Game } from "./Game"
import { Game2 } from "./Game2"

const Room = () => {
  const dispatch = useDispatch()
  const roomId = window.location.pathname.slice(13)
  const homeURL = "http://localhost:3000/nevada/main/home" //update URL of home
  const [users, setUsers] = useState([socket.id])
  const playerId = useNevadaSelector((state) => state.game.playerId)

  useEffect(() => {
    askJoinRoom()
    getServerReponse()
    AnUserJoined()
    AnUserHasLeft()
  }, [users])

  useEffect(() => {
    

    socket.once("Player abandon", () => {
      //je suis le joueur gagnant
      if (playerId >= 0) {
        socket.emit("Winner room", playerId)
      }
      console.log("joueur abandonné looser")
      //affichage du joueur gagnant à l'écran
    })

    socket.on("Room invalid", (message) => {
      alert(message)
      window.location.assign("/nevada/main/home")
    })

    socket.once("2 players server side", (data) => {
      console.log(data)
      socket.emit("2 players server side", data)
    })
  }, [])

  function askJoinRoom() {
    socket.once("connect", () => {
      socket.emit("Join a room", roomId)
    })
  }

  function getServerReponse() {
    socket.on("Join a room", (joined, gameCode) => {
      if (!joined) window.location.href = homeURL
    })
  }

  function AnUserJoined() {
    socket.on("An user joined the room", (userslist) => {
      setUsers(userslist)
    })
  }

  function AnUserHasLeft() {
    socket.on("An user has left the room", (userslist) => {
      setUsers(userslist)
    })
  }

  function showPlayers() {
    return users.map((user, index) => {
      return <li key={index}>{user}</li>
    })
  }

  return <Game2 gameCode={roomId} />
}

export default Room
