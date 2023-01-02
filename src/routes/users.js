const userRouter = require('express').Router();

// User Registration Route
userRouter.post('/register-user', async (req, res) => {
});

// Admin Registration Route
userRouter.post('/register-admin', async (req, res) => {
});

// Super Registration Route
userRouter.post('/register-super', async (req, res) => {
});

// User Login Route
userRouter.post('/login-user', async (req, res) => {
});

// Admin Login Route
userRouter.post('/login-admin', async (req, res) => {
});

// Super Login Route
userRouter.post('/login-super', async (req, res) => {
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
