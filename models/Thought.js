const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');


const thoughtSchema = new Schema(
    {

        text: {
            type: String,
            required: true,
            maxLength: 280,
            minLength: 1,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            //format timestamp on query
            get: function() {
                const date = this._doc.createdAt;
                date.toLocaleDateString()
            }
        },

        username: {
            type: String,
            required: true,
        },

        reactions: [reactionSchema]

    },

    {
        toJSON: {
            vurtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.comments.length;
})

const Thought = model('thought', thoughtSchema)

module.exports = Thought;