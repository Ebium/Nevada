import { useEffect } from 'react';
import { socket } from '../../socket-context';

const RoomButton = () => {
    const domain = "http://localhost:3000/nevada/main/"

    useEffect(()=>{
        getServerReponse()
    },[])

    function createRoom(){
        socket.emit("Create a new room");
    }

    function getServerReponse(){
        socket.on("Create a new room", (roomId, isCreated)=> {
            if(isCreated)
                window.location.href = domain + roomId;
            else 
                alert("An internal problem has occurred.");
        } )
    }

    return (
        <button onClick={createRoom}>
            CREATE ROOM
        </button>
    );
};

export default RoomButton;