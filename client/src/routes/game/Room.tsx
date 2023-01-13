import { useEffect, useState } from "react"
import { socket } from "../../socket-context"
import { useNevadaSelector } from "../../store/rootReducer"
import { Game2 } from "./Game2"

const Room = () => {
  const roomId = window.location.pathname.slice(13)
  const homeURL = "http://localhost:3000/nevada/main/home" //update URL of home
  const [users, setUsers] = useState([socket.id])
  const game = useNevadaSelector((state) => state.game)

  useEffect(() => {
    askJoinRoom()
    getServerReponse()
    AnUserJoined()
    AnUserHasLeft()
  }, [users])

  useEffect(() => {
    socket.on("Player abandon", (playerId) => {
      //je suis le joueur gagnant
      if (playerId >= 0) {
        if(playerId==0)
          socket.emit("Winner room", playerId, game.player2.pseudo)
        else
          socket.emit("Winner room", playerId, game.player1.pseudo)
      }
    })

    socket.on("Room invalid", (message) => {
      alert(message)
      window.location.assign("/nevada/main/home")
    })

    socket.once("2 players server side", (data) => {
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

  return <Game2 gameCode={roomId} />
}

export default Room
