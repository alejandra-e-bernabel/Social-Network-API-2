const User = require('../../models/User');
const router = require ('express').Router();

// /api/users routes

//get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});


// get a single user by its id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id})
            // .select('__v'); //not sure what this is for

        if (!user) {
            return res.status(404).json({message: 'No user with that ID exists'});
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//post a new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        res.json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
})

//update a user by id
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {runValidators: true, new: true}
        );

        if (!updatedUser) {
            return res.status(404).json({message: 'No such user exists'});
        };

        res.json(updatedUser);

    } catch (err) {
        res.status(500).json(err)
    }
});

//delete user by id
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.deleteOne({_id: req.params.id});

        if (!user) {
            return res.status(404).json({message: 'No such user exists'});
        };
    
        res.json({message: 'User successfully deleted'});
    } catch (err) {
        res.status(500).json(err);
    }
    
});



//route `/api/users/:userId/friends/:friendId`**

// `POST` to add a new friend to a user's friend list

// `DELETE` to remove a friend from a user's friend list




module.exports = router;