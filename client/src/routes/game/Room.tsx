import { useEffect, useState } from 'react';
import { socket } from '../../socket-context';
import { Game } from './Game';

const Room = () => {
    const roomId = window.location.pathname.slice(18);
    const homeURL = "http://localhost:3000/nevada/main/home" //update URL of home
    const [users, setUsers] = useState([socket.id])
    useEffect(()=>{
        askJoinRoom()
        getServerReponse()
        AnUserJoined()
        AnUserHasLeft()
    },[users])
    

    function askJoinRoom() {
        socket.once("connect", ()=> {
            socket.emit("Join a room",roomId)
        })
    }

    function getServerReponse() {
        socket.on("Join a room", (joined)=> {
            if(joined)
                alert("joined the room")
            else
                window.location.href = homeURL
        })
    }

    function AnUserJoined() {
        socket.on("An user joined the room", (userslist)=> {
            setUsers(userslist)
        })
    }

    function AnUserHasLeft() {
        socket.on("An user has left the room", (userslist)=> {
            setUsers(userslist)
        })
    }

    function showPlayers() {
        return users.map((user, index) => {
            return (<li key={index}>{user}</li>)
        })
    }

    

    return (
        <div>
            Room : {roomId}
            <div>{showPlayers()}</div>
            <Game></Game>
        </div>
    );
};

export default Room;