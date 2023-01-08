const User = require('../models/User');

// Insert User
const insertUser = async (data) => {
    return await new User(data).save();
};

// Get User By
const findBy = async (filter) => {
    return User.findOne(filter);
};

// Get All Users
const findAll = async (filter) => {
    return User.find(filter);
};

module.exports = {
    insertUser,
    findBy,
    findAll
}
