import { useEffect } from 'react';
import { socket } from '../../socket-context';

const Room = () => {
    const roomId = window.location.pathname.slice(13);
    const homeURL = "http://localhost:3000/nevada/main/home" //update URL of home

    useEffect(()=>{
        askJoinRoom()
        getServerReponse()
    },[])

    function askJoinRoom() {
        socket.emit("Join a room",roomId)
    }

    async function getServerReponse() {
        socket.on("Join a room", (joined)=> {
            if(joined)
                alert("joined the room")
            else
                window.location.href = homeURL
        })
    }


    return (
        <div>
            Room : {roomId}
        </div>
    );
};

export default Room;