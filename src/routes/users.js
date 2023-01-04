import {getAllUsers} from '../controllers/User';
import {userRegister, userLogin, userAuthenticated, serializeUser, checkUserRole} from '../controllers/Auth';

const userRouter = require('express').Router();

// User Registration Route
userRouter.post('/register', async (req, res) => {
    await userRegister(req.body, req.body.role, res);
});

// User Login Route
userRouter.post('/login', async (req, res) => {
    await userLogin(req.body, res);
});

// Profile Route (Get user info)
userRouter.get('/profile', userAuthenticated, async (req, res) => {
    return res.json(serializeUser(req.user));
});

// Get All Users
userRouter.get('/get', userAuthenticated, async (req, res) => {
    return await getAllUsers(req, res);
});

// User Protected Route
userRouter.get('/unprotected-user', async (req, res) => {
    return res.json('Hello User');
});

// Admin Protected Route
userRouter.get('/protected-admin', userAuthenticated, checkUserRole(['admin']), async (req, res) => {
    return res.json('Hello Admin');
});

// Super Protected Route
userRouter.get('/protected-super', userAuthenticated, checkUserRole(['super']), async (req, res) => {
    return res.json('Hello Super');
});

// Super & Admin Protected Route
userRouter.get('/protected-super-admin', userAuthenticated, checkUserRole(['super', 'admin']), async (req, res) => {
    return res.json('Hello Super || Admin');
});

module.exports = userRouter;
