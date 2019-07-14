const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Suggestion model
const suggestionSchema = new Schema({
    suggestion: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    questionTitle: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('suggestions', suggestionSchema);