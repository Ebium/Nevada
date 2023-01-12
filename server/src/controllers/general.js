const get_players_counter = (req, res) => {
  const io = req.app.get("socketio")
  const ct_players = io.sockets.sockets.size

  res.status(200).json({ count: ct_players })
}

const get_games_counter = (req, res) => {
  const io = req.app.get("socketio")

  const ct_games = io.sockets.adapter.rooms.size

  res.status(200).json({ count: ct_games })
}
const get_spectators_counter = (req, res) => {
    var spectatorsCounter = req.app.get('spectatorsCounter')

  res.status(200).json({ count: spectatorsCounter })
}

module.exports = {
  get_players_counter,
  get_games_counter,
  get_spectators_counter,
}
