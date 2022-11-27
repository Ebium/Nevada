const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
    players: { type: Object, default: { red:"" , blue:""} },
    spectators:{ type: Array, default: [] },
    private:{ type: Boolean, default: false },
    countPeople: { type: Number, default: 0 },
}, {
    versionKey: false
})

const Room = mongoose.model('room', RoomSchema)

module.exports = Room


