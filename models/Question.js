const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Question model
const QuestionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('questions', QuestionSchema);