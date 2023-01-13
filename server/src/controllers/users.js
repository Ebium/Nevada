require("dotenv").config()
const User = require("../models/User.js")
const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY)
const { matchPassword } = require("./password")
const { createStripeCustomer, searchStripePaymentIntentPaidByCusId, searchStripeSubscriptionPaidByCusId, deleteSubscriptionStripeById } = require("./payment")

/* ========================================
    Search functions
 ========================================*/

const findUsers = (req, res) => {
  User.find({})
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }))
}

const get_current_user = (req, res) => {
  console.log(req.params)
  User.findOne({ email: req.params.email })
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }))
}

const findUserById = async (userId) => {
  return User.findOne({ _id: userId })
    .then((result) => {
      return result
    })
    .catch((error) => console.log(error))
}

const findUserByEmail = async (email) => {
  return User.findOne({ email: email })
    .then((result) => {
      return result
    })
    .catch((error) => console.log(error))
}

const findUserByPseudo = async (pseudo) => {
  return User.findOne({ pseudo: pseudo })
    .then((result) => {
      return result
    })
    .catch((error) => console.log(error))
}

const findUserBySocketId = async (socketId) => {
  return User.findOne({ socketId: socketId })
    .then((result) => {
      return result
    })
    .catch((error) => console.log(error))
}

const findUsersForRanking1 = (req, res) => {
  const sortOption = { played: 1 }
  const result = User.find({}).toArray
  return res.status(200).json({ result })
}

const findUsersForRanking = (req, res) => {
  User.find({})
    .then((result) => {
      let player1
      let player2
      let player3

      const sortedResult = result.sort(function (a, b) {
        return a.won > b.won ? -1 : 1
      })

      if (sortedResult.length >= 1) player1 = sortedResult[0]

      if (sortedResult.length >= 2) player2 = sortedResult[1]

      if (sortedResult.length >= 3) player3 = sortedResult[2]

      return res.status(200).json([player1, player2, player3 ])
    })
    .catch((error) => res.status(500).json({ msg: error }))
}

/* ========================================
    Update functions
 ======================================== */

const createUser = async (user) => {
  return User.create(user)
    .then((result) => {
      return { user: result, errors: null }
    })
    .catch((error) => console.log(error))
}

const updateUser = async (user) => {
  return User.findOneAndUpdate({ _id: user._id }, user, {
    new: true,
    runValidators: true,
  })
    .then((result) => {
      return result
    })
    .catch((error) => console.log(error))
}

const deleteUser = async (user) => {
  return User.findOneAndDelete({ _id: user.UserID })
    .then((result) => {
      return result
    })
    .catch((error) => console.log(error))
}

/* ========================================
    Verification functions
 ========================================= */

const userPseudoExist = async (pseudo) => {
  return (await findUserByPseudo(pseudo)) == null ? false : true
}

const userEmailExist = async (email) => {
  return (await findUserByEmail(email)) == null ? false : true
}

const userAccountPasswordMatch = async (email, password) => {
  const userPasswordDB = await findUserByEmail(email).then((result) => {
    return result.password
  })
  return matchPassword(password, userPasswordDB)
}

const userExist = async (user) => {
  var errors = { exist: false }

  if (await userEmailExist(user.email)) {
    errors.email = "This email already exists."
    errors.exist = true
  }

  if (await userPseudoExist(user.pseudo)) {
    errors.pseudo = "This pseudonym already exists."
    errors.exist = true
  }

  return errors
}

/*
 * verify if there are a connected socket
 * => if user is connected
 */
const userIsConnected = async (user) => {
  const userDB = await findUserByEmail(user.email)
  if (userDB == null) return false

  const userSocketId = userDB.socketId

  return user.sockets.get(userSocketId) ? true : false
}

/* ========================================
    Personalized functions
======================================== */

/*
 *  Create only if
 *  pseudo and email
 *  don't exist in database
 */
const registerValidUser = async (user) => {
  var errors = await userExist(user)

  if (errors.exist) return { user: null, errors: errors }

  const userObject = await createNewUserObject(user)
  return createUser(userObject)
}

/*
 *  if email and password
 *  match with the database
 *  and is not connected
 *  update user in database
 *  return user
 */
const loginUserAuth = async (user) => {
  if (!(await userEmailExist(user.email))) {
    return "Your email is not registered."
  }
  if (!(await userAccountPasswordMatch(user.email, user.password)))
    return "Your password is incorrect."

  if (await userIsConnected(user)) {
    return "The account is already connected."
  }

  const userFind = await findUserByEmail(user.email)

  var userEdited = userFind
  userEdited.socketId = user.socketId
  const userUpdated = await updateUser(userEdited)

  return await findUserByEmail(user.email)
}


/*
 * if player paid for premium
 * update player premium status
 */
const userPayment = async(user) => {
  var userEdited = user
  var paymentIntent 
  var subscription

  paymentIntent = await searchStripePaymentIntentPaidByCusId(user.cusId)
  subscription = await searchStripeSubscriptionPaidByCusId(user.cusId)

  //est premium life
  if(paymentIntent.data[0] != null  && paymentIntent.data[0].amount == 1999) {
    userEdited.premium = true
    userEdited.premiumLifeTime = true
    userEdited.paidDate = Date.now()
    updateUser(userEdited)
    return
} 

  //est premium
  if(subscription.data[0] !=null) {
      userEdited.premium = true
      userEdited.paidDate = Date.now()
      updateUser(userEdited)
      return
  } 

}

const userUnsubscribe = async(user)=> {
  const subscription = await searchStripeSubscriptionPaidByCusId(user.cusId)
  var userEdited = user
  user.premium = false

  deleteSubscriptionStripeById(subscription.data[0].id)
  updateUser(userEdited)
}

/*******************************************
    User Object type 
********************************************/

const createNewUserObject = async (user) => {
  const cus = await createStripeCustomer(user)
  return {
    email: user.email,
    password: user.password,
    pseudo: user.pseudo,
    cusId: cus.id,
    socketId: user.socketId,
  }
}

module.exports = {
  loginUserAuth,
  registerValidUser,
  get_current_user,
  findUsers,
  findUserBySocketId,
  updateUser,
  userPayment,
  userUnsubscribe,
  findUsersForRanking
}
