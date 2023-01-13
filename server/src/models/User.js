const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    pseudo: String,
    premium: { type: Boolean, default: false },
    premiumLifeTime: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    played: { type: Number, default: 0 },
    won: { type: Number, default: 0 },
    winStreak: { type: Number, default: 0 },
    pseudoColor: { type: String, default: "gold" },
    cusId: { type:String, default: "" },
    socketId: { type: String, default: ""},
    paidDate : { type : Date, default: "" }
  },
  {
    versionKey: false,
  }
)

const User = mongoose.model("user", userSchema)

module.exports = User
