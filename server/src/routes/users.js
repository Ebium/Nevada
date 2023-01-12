const express = require("express")
const router = express.Router()

const { get_current_user, findUsers, findUsersForRanking } = require("../controllers/users.js")

router.get("/", findUsers)

router.get("/ranking", findUsersForRanking)

router.get("/:email", get_current_user)

module.exports = router
