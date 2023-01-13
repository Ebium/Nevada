const express = require("express")
const router = express.Router()

const {
  get_players_counter,
  get_games_counter,
  get_spectators_counter,
} = require("../controllers/general.js")

router.get("/get_players_counter", get_players_counter)

router.get("/get_games_counter", get_games_counter)

router.get("/get_spectators_counter", get_spectators_counter)

module.exports = router
