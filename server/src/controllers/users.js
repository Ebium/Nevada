const User = require("../models/User.js")
const { hashedPassword, matchPassword } = require("./password")

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
    User.findOne({email: req.params.email})
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
  return User.findOneAndUpdate({ _id: user.UserID }, user, {
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

/* ========================================
    Personalized functions
======================================== */

/*
 *  Create only if
 *  pseudo and email
 *  don't exist in database
 */
const createValidUser = async (user) => {
  var errors = await userExist(user)

  if (errors.exist) return { user: null, errors: errors }

  const userObject = createNewUserObject(user)
  return createUser(userObject)
}

/*
 *  Update auth only if
 *  email and password
 *  match with the database
 */
const updateUserAuth = async (user) => {
  if (!(await userEmailExist(user.email))) {
    return "Your email is not registered."
  }
  if (!(await userAccountPasswordMatch(user.email, user.password)))
    return "Your password is incorrect."

  return User.updateOne({ email: user.email }, { auth: user.auth }).then(
    (result) => {
      result.user = user
      return result
    }
  )
}

/*******************************************
    User Object type 
********************************************/

const createNewUserObject = (user) => {
  return {
    email: user.email,
    password: hashedPassword(user.password),
    pseudo: user.pseudo,
  }
}

module.exports = {
  updateUserAuth,
  createValidUser,
  get_current_user,
  findUsers,
}
