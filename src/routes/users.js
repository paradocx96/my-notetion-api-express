const {userRegister, userLogin, userAuthenticated, serializeUser, checkUserRole} = require('../controllers/Auth');
const {getAllUsers} = require('../controllers/User');
const router = require('express').Router();

// User Registration Route
router.post('/register', async (req, res) => {
    await userRegister(req.body, req.body.role, res);
});

// User Login Route
router.post('/login', async (req, res) => {
    await userLogin(req.body, res);
});

// Profile Route (Get user info)
router.get('/profile', userAuthenticated, async (req, res) => {
    return res.json(serializeUser(req.user));
});

// Get All Users
userRouter.get('/get', userAuthenticated, async (req, res) => {
    return await getAllUsers(req, res);
});

// User Protected Route
router.get('/unprotected-user', async (req, res) => {
    return res.json('Hello User');
});

// Admin Protected Route
router.get('/protected-admin', userAuthenticated, checkUserRole(['admin']), async (req, res) => {
    return res.json('Hello Admin');
});

// Super Protected Route
router.get('/protected-super', userAuthenticated, checkUserRole(['super']), async (req, res) => {
    return res.json('Hello Super');
});

// Super & Admin Protected Route
router.get('/protected-super-admin', userAuthenticated, checkUserRole(['super', 'admin']), async (req, res) => {
    return res.json('Hello Super || Admin');
});

module.exports = router;
