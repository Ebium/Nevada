import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { socket } from "../../socket-context"
import { updatePlayerId } from "../../store/ducks/Game.ducks"
import { Game } from "./Game"
import { Game2 } from "./Game2"

const Room = () => {
  const dispatch = useDispatch()
  const roomId = window.location.pathname.slice(13)
  const homeURL = "http://localhost:3000/nevada/main/home" //update URL of home
  const [users, setUsers] = useState([socket.id])
  useEffect(() => {
    askJoinRoom()
    getServerReponse()
    AnUserJoined()
    AnUserHasLeft()
  }, [users])

  useEffect(() => {
    socket.on("update playerId", (playId) => {
      dispatch(updatePlayerId(playId))
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
