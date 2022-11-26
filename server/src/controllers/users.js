const User = require('../models/User.js')
const { hashedPassword } = require("./password")

/* ========================================
    Search functions
 ========================================*/

const findUsers = async() => {
    return User.find({})
        .then(result => { return result; } )
        .catch(error => console.log(error))
}

const findUserById = async(userId) => {
    return User.findOne({ _id: userId })
        .then(result => { return result; } )
        .catch(error => console.log(error))
}

const findUserByEmail = async(email) => {
    return User.findOne({ email : email })
    .then(result => { return result; } )
    .catch(error => console.log(error))
} 

const findUserByPseudo = async(pseudo) => {
    return User.findOne({ pseudo : pseudo })
    .then(result => { return result; } )
    .catch(error => console.log(error))
} 

/* ========================================
    Update functions
 ======================================== */

const createUser = async(user) => {
    return User.create(user)
    .then(result => { return {user : result, errors: null}; } )
    .catch(error => console.log(error))
}

const updateUser = async(user) => {
    return User.findOneAndUpdate({ _id: user.UserID }, user, { new: true, runValidators: true })
        .then(result => { return result; } )
        .catch(error => console.log(error))
}

const deleteUser = async(user) => {
    return User.findOneAndDelete({ _id: user.UserID })
        .then(result => { return result; } )
        .catch(error => console.log(error))
}

/* ========================================
    Verification functions
 ========================================= */

const userPseudoExist = async(pseudo) => {
    return await findUserByPseudo(pseudo) == null ? false : true;
}

const userEmailExist = async(email) => {
    return await findUserByEmail(email) == null ? false : true;
}

const userExist = async(user) => {
    var errors = { exist:false }

    if(await userEmailExist(user.email)) {
        errors.email = "This email already exists."
        errors.exist=true;
    }
        
    if(await userPseudoExist(user.pseudo)) {
        errors.pseudo = "This pseudonym already exists."
        errors.exist=true;
    }

    return errors;
}

/* ========================================
    Personalized functions
======================================== */

/*
 *  Create only if  
 *  pseudo and email  
 *  don't exist in database
 */
const createValidUser = async(user) => {
    var errors = await userExist(user)

    if(errors.exist)
        return { user : null, errors: errors}; 

    const userObject = createNewUserObject(user);
    return createUser(userObject);
}

/*******************************************
    User Object type 
********************************************/

const createNewUserObject = (user) => {
    return {
        email:user.email,
        password:hashedPassword(user.password),
        pseudo:user.pseudo,
        premium:false,
        createdAt: new Date(),
        played:0,
        won:0,
        watched:0
    }
}


module.exports = {
    createValidUser,
}
