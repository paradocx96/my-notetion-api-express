const userRouter = require('express').Router();
const {userRegister,userLogin} = require('../controllers/Auth');

// User Registration Route
userRouter.post('/register', async (req, res) => {
    await userRegister(req.body, req.body.role, res);
});

// User Login Route
userRouter.post('/login', async (req, res) => {
    await userLogin(req.body, res);
});

// User Protected Route
userRouter.post('/protected-user', async (req, res) => {
});

// Admin Protected Route
userRouter.post('/protected-admin', async (req, res) => {
});

// Super Protected Route
userRouter.post('/protected-super', async (req, res) => {
});

// Profile Route
userRouter.get('/profile', async (req, res) => {
});

module.exports = userRouter;
