import User from '../models/User';

// Insert User
export const insertUser = async (data) => {
    return await new User(data).save();
};

// Get User By
export const findBy = async (filter) => {
    return User.findOne(filter);
};

// Get All Users
export const findAll = async (filter) => {
    return User.find(filter);
};
