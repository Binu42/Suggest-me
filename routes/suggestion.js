require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const {
    ensureAuthenticated
} = require('../helpers/auth');


const db = require('../config/database');

// Connecting to Database
mongoose.connect(db.mongoURI, {
    useNewUrlParser: true
}).then(function () {
    console.log('successfully connected to database');
}).catch((err) => console.log(err));

// acquiring Schema suggestions
require('../models/Suggestion');
const Suggestion = mongoose.model('suggestions');

// acquiring Schema questions
require('../models/Question');
const Question = mongoose.model('questions');


// route for suggestions
router.get('/', ensureAuthenticated, function (req, res) {
    Suggestion.find({
            user: req.user.id
        })
        .sort({
            'date': 'desc'
        })
        .then(suggestions => {
            res.render('suggestion/index', {
                suggestions: suggestions,
                username: req.user.name.toUpperCase()
            })
        })

});

// route to add suggestion
router.get('/add/:id', ensureAuthenticated, function (req, res) {
    Question.findOne({
        _id: req.params.id
    }, function (error, question) {
        if (!error) {
            if (question.user === req.user.id) {
                req.flash('error_msg', 'You can not reply your own question');
                res.redirect('/');
            } else {
                res.render('suggestion/add', {
                    question: question
                });
            }
        } else {
            console.log(error)
        }
    })
});

// route to edit a suggestion
router.get('/edit/:id', ensureAuthenticated, function (req, res) {
    Suggestion.findOne({
            _id: req.params.id
        })
        .then(suggestion => {
            if (suggestion.user !== req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/suggestions');
            } else {
                res.render('suggestion/edit', {
                    suggested: suggestion
                })
            }
        })
});

// route to post a suggestion
router.post('/:id', ensureAuthenticated, function (req, res) {
    const newUser = {
        suggestion: req.body.suggestion,
        question: req.params.id,
        questionTitle: req.body.question,
        user: req.user.id
    }
    new Suggestion(newUser)
        .save()
        .then(suggestion => {
            req.flash('success_msg', "Suggestion Added");
            res.redirect('/suggestions');
        });
});

// updating Suggestions
router.put('/:id', ensureAuthenticated, function (req, res) {
    Suggestion.findOne({
            _id: req.params.id
        })
        .then(suggestion => {
            suggestion.suggestion = req.body.suggestion;

            suggestion.save()
                .then(suggestion => {
                    req.flash('success_msg', "Suggestion Updated");
                    res.redirect('/suggestions')
                })

        })
});

// Delete suggestions
router.delete('/:id', ensureAuthenticated, function (req, res) {
    Suggestion.deleteOne({
            _id: req.params.id
        })
        .then(() => {
            req.flash('error_msg', "Suggestion Removed");
            res.redirect('/suggestions')
        });
});

module.exports = router;