const router = require ('express').Router();
const apiRoutes = require ('./api');

router.use('/api', apiRoutes);

//all routes should start with /api since this is only a backend app
router.use((req, res) => {
    return res.send('Wrong route!');
});

module.exports = router;