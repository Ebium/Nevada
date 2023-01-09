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
    auth: { type: String, default: "" },
    pseudoColor: { type: String, default: "gold" },
  },
  {
    versionKey: false,
  }
)

const User = mongoose.model("user", userSchema)

module.exports = User
