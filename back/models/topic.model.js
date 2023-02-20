const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    pseudo: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        minLength: 1,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    comments: {
        type: [
            {
                commenterId: String,
                commenterPseudo: String,
                text: String,
                timestamp: Number,
            }
        ],
        required: true,
    }
});

const topicModel = mongoose.model('topic', topicSchema);

module.exports = topicModel;

