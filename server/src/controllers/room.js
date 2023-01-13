const Room = require('../models/Room.js')
const mongoose = require("mongoose")

/*
 * Clean rooms at the start of the server
 * or when we reset the server
 */
const clearRooms = async() => {
    return Room.deleteMany({});
}


/* ========================================
    Search functions
 ========================================*/

const findRooms = async() => {
    return Room.find({})
        .then(result => { return result; } )
        .catch(error => console.log(error))
}

const findRoom = async(room) => {
    return Room.findOne({ _id: room._id })
        .then(result => { return result; } )
        .catch(error => console.log(error))
}

const findRoomById = async(id) => {
    return Room.findOne({ _id: id })
        .then(result => { return result; } )
        .catch(error => console.log(error))
}


/* ========================================
    Update functions
 ======================================== */

const createRoom = async(room) => {
    return Room.create(room)
        .then(result => { return result; } )
        .catch(error => console.log(error))
}

const deleteRoom = async(roomId) => {
    return Room.findOneAndDelete({ _id: mongoose.Types.ObjectId(roomId) })
        .then(result => { return result; } )
        .catch(error => console.log(error))
}

const updateRoom = async(room) => {
    return Room.findOneAndUpdate({ _id: room._Id }, room, { new: true, runValidators: true })
        .then(result => { return result; } )
        .catch(error => console.log(error))
}

/* ========================================
    Verify functions
======================================== */

const roomExist = async(id) => {
    const room = await findRoomById(id)
    return room ? true : false
}

/* ========================================
    Personalized functions
======================================== */

/*
 *  If room id exist
 *  update user as player 
 *  if not place as spectator
 *  in database
 */
const updateANewPlayerRoom = async(room, player) => {
    const roomWithNewPlayer = await updateEmptyPlayerPlace(room,player);
    if(roomWithNewPlayer == "Room id is incorrect" )
        return  "Room id is incorrect"

    return Room.updateOne({ _id: room._id }, roomWithNewPlayer, { new: true, runValidators: true })
    .then(result => { return result; } )
    .catch(error => console.log(error))
}

/*
 *  If room id exist
 *  delete user as player or spectator
 *  and if countPeople <= 0 delete room
 *  in database
 */
const updateAQuitPlayerRoom = async(room, player) => {
    const roomWithQuitPlayer = await updateQuitPlayerPlace(room,player);
    if(roomWithQuitPlayer== "Room id is incorrect" )
        return  "Room id is incorrect" 

    if(roomWithQuitPlayer.countPeople-1<0)
        return await deleteRoom(room);

    return Room.updateOne({ _id: room._id }, roomWithQuitPlayer, { new: true, runValidators: true })
    .then( async(result) => { return result } )
    .catch(error => console.log(error))
}

/*
 *  If room id exist
 *  get an Room Object updated
 *  with player inside the room
 *  and increment countPeople
 *  in database
 */
const updateEmptyPlayerPlace = async(room, playerSocketId) => {
    var roomPlace = await findRoom(room);
    if(roomPlace==null)
        return "Room id is incorrect"

    if(roomPlace.players.red == "") {
        roomPlace.players.red = playerSocketId
        roomPlace.countPeople ++
        return roomPlace
    }
    if(roomPlace.players.blue == "") {
        roomPlace.players.blue = playerSocketId
        roomPlace.countPeople ++
        return roomPlace
    }
    
    roomPlace.spectators.push(playerSocketId)
    roomPlace.countPeople ++
    return roomPlace
}

/*
 *  If room id exist
 *  get an Room Object updated
 *  with player deleted of the room
 *  and decrement countPeople
 *  in database
 */
const updateQuitPlayerPlace = async(room, playerSocketId) => {
    var roomPlace = await findRoom(room);    

    if(roomPlace==null)
        return "Room id is incorrect"

    if(roomPlace.players.red == playerSocketId) {
        roomPlace.players.red = ""
        roomPlace.countPeople --
        return roomPlace
    }
    if(roomPlace.players.blue == playerSocketId) {
        roomPlace.players.blue = ""
        roomPlace.countPeople --
        return roomPlace
    }
    if(roomPlace.spectators.includes(playerSocketId)){
        roomPlace.spectators.pull(playerSocketId)
        roomPlace.countPeople --
    }
    
    return roomPlace
}


module.exports = {
    createRoom,
    updateANewPlayerRoom,
    updateAQuitPlayerRoom,
    deleteRoom,
    clearRooms,
    roomExist, deleteRoom
}
