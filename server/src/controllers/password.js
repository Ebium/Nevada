const bcrypt = require("bcrypt")

const hashedPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
}

const verifyPassword = (password,hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}

module.exports = {
    hashedPassword,
    verifyPassword
}
