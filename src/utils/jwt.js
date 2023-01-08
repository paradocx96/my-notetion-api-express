const {APP_SECRET, JWT_EXPIRE} = require('../constants');
const jwt = require('jsonwebtoken');

// Generate token
const generateToken = (data) => {
    return jwt.sign(
        data,
        APP_SECRET,
        {
            expiresIn: `${JWT_EXPIRE}`
        }
    );
}

// Decode token
const decodeToken = (tokenData) => {
    return jwt.verify(tokenData, APP_SECRET);
}

module.exports = {
    generateToken,
    decodeToken
}
