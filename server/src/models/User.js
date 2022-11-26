const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:String,
    password:String,
    pseudo:String,
    premium:Boolean,
    createdAt:Date,
    played:Number,
    won:Number,
    watched:Number,
}, {
    versionKey: false
})

const User = mongoose.model('user', userSchema)

module.exports = User


