const jwt = require('jsonwebtoken');
const {SECRET, JWT_EXPIRE} = require('../config');

// Generate token
const generateToken = (data) => {
    return jwt.sign(
        data,
        SECRET,
        {
            expiresIn: `${JWT_EXPIRE}`
        }
    );
}

// Decode token
const decodeToken = (tokenData) => {
    return jwt.verify(tokenData, SECRET);
}

module.exports = {
    generateToken,
    decodeToken
}
