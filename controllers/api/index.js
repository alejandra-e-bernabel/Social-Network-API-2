const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./users-routes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;