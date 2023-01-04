const router = require('express').Router();
const userRoutes = require('./users');
const noteRoutes = require('./notes');

router.use('/users', userRoutes);
router.use('/notes', noteRoutes);

module.exports = router;
