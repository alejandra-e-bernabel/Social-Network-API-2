const { Schema, model } = require ('mongoose');

const userSchema  = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },

        email: {
            type: String,
            unique: true,
            required: true,
            match: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        },

        thoughts:
            [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'thought',
                }
            ]
        ,

        friends: 
        [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            }
        ]
    }
);

const User = model('user', userSchema);

module.exports = User;