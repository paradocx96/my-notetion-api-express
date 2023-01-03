const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const logger = require("../utils/logger");
const {generateToken} = require('../utils/jwt')
const {BCRYPT_SALT_ROUNDS} = require('../config');

const userRegister = async (userData, role, res) => {
    try {
        // Validate the username
        let usernameCheck = await validateUsername(userData.username);
        if (!usernameCheck) {
            return res.status(400).json({
                message: 'Username already exists',
                success: false
            });
        }

        // Validate the email
        let emailCheck = await validateEmail(userData.email);
        if (!emailCheck) {
            return res.status(400).json({
                message: 'Email already exists',
                success: false
            });
        }

        // Hashed password
        const password = await bcrypt.hash(userData.password, parseInt(BCRYPT_SALT_ROUNDS));

        // Create new user
        const newUser = new User({
            ...userData,
            password,
            role
        });

        // Save the user
        await newUser.save();

        // Return response
        return res.status(201).json({
            message: 'User created successfully!!!',
            success: true
        });
    } catch (err) {
        logger.info("User Register - Error: ", err);

        // Return response
        return res.status(500).json({
            message: 'Unable to create user!!!',
            success: false
        });
    }
};

const userLogin = async (userCredentials, res) => {
    try {
        let {username, password} = userCredentials;

        // Find user by username
        const user = await User.findOne({username});
        if (!user) {
            return res.status(404).json({
                message: 'Username not found. Invalid credentials!!!',
                success: false
            });
        }

        // Check password validity
        let isMatchPassword = await bcrypt.compare(password, user.password);
        if (isMatchPassword) {
            // Token signing for user
            let token = generateToken(
                {
                    user_id: user._id,
                    name: user.name,
                    username: user.username,
                    role: user.role,
                    email: user.email
                }
            );

            // Payload of result
            let result = {
                name: user.name,
                username: user.username,
                role: user.role,
                email: user.email,
                token: `Bearer ${token}`,
                expiresIn: 168
            }

            // Sending success result
            return res.status(200).json({
                ...result,
                message: 'User login success!!!',
                success: true
            });
        } else {
            return res.status(404).json({
                message: 'Incorrect Password!!!',
                success: false
            });
        }
    } catch (err) {
        logger.info("User Login - Error: ", err);

        // Return error response
        return res.status(500).json({
            message: 'Unable to login user!!!',
            success: false
        });
    }
};

// Passport middleware Get user
const userAuthenticated = passport.authenticate('jwt', {session: false});

// Serialize User Info (Reduce Password)
const serializeUser = user => {
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };
};

// Check User role for RBAC
const checkUserRole = roles => (req, res, next) =>
    !roles.includes(req.user.role)
        ? res.status(401).json('Unauthorized')
        : next();

// Validate username
const validateUsername = async (username) => {
    let user = await User.findOne({username});
    return !user;
};

// Validate email
const validateEmail = async (email) => {
    let user = await User.findOne({email});
    return !user;
};

module.exports = {
    userRegister,
    userLogin,
    userAuthenticated,
    serializeUser,
    checkUserRole
}
