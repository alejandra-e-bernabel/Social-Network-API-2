const Thought = require('../../models/Thought');
const User = require('../../models/User');
const router = require ('express').Router();


// /api/thoughts routes

//get all thoughts
router.get('/', async (req, res) => {
    try {
        const thought = await Thought.find();
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get one thought by id
router.get('/:id', async (req, res) => {
    try {
        const thought = await Thought.findOne({_id: req.params.id})

        if (!thought) {
            return res.status(404).json({message: 'No thought with that ID exists'});
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

//post a new thought
router.post('/', async (req, res) => {
    try {
        const thoughtData = await Thought.create(req.body);

        const {userId } = req.body;
        const {_id} = thoughtData;

        const updateUser = await User.findOneAndUpdate(
            {_id: userId},
            { $addToSet: {thoughts: _id}}
        );

        if (!updateUser) {
            return res.status(404).json( { message: 'No such user exists'});
        }

        res.json(thoughtData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// update a thougth by id
router.put('/:id', async (req, res) => {
    try {
        const updatedThought = await Thought.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {runValidators: true, new: true}
        );

        if (!updatedThought) {
            return res.status(404).json({message: 'No such thought exists'});
        };

        res.json(updatedThought);

    } catch (err) {
        res.status(500).json(err)
    }
});

// delete a thought by id
router.delete('/:id', async (req, res) => {
    try {
                

        //pop the thought ID from user
        const thoughtInfo = await Thought.findOne({_id: req.params.id});

        if (!thoughtInfo) {
            return res.status(404).json({message : 'No such thought'});
        };

        const user = await User.findOne({ username : thoughtInfo.username});

        if (!user) {
            return res.status(404).json( { message: 'No such user exists'});
        };

        // delete the thought 
        const thought = await Thought.deleteOne({_id: req.params.id});

        user.thoughts.pull(req.params.id);
        await user.save();
    
        res.json({message: 'Thought successfully deleted'});
    } catch (err) {
        res.status(500).json(err);
    }
    
});


// `/api/thoughts/:thoughtId/reactions`**

// `POST` to create a reaction stored in a single thought's `reactions` array field
router.post('/:thoughtId/reactions', async (req,res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $addToSet: {reactions: req.body} },
            { runValidators: true, new: true} 
        );

        if (!thought) {
            return res.status(404).json( { message: 'No such thought exists'});
        };

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});


// `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
router.delete('/:thoughtId/reactions/:reactionId', async (req,res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $pull: {reactions: { reactionId: req.params.reactionId}} },
            { runValidators: true, new: true} 
        );

        if (!thought) {
            return res.status(404).json( { message: 'No such thought exists'});
        };

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;