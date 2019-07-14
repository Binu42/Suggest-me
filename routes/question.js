const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// requiring authorization for authentications
const {
    ensureAuthenticated
} = require('../helpers/auth');

// acquiring Schemas
require('../models/Question');
const Question = mongoose.model('questions');
require('../models/Suggestion');
const Suggestion = mongoose.model('suggestions');

// route for Questions
router.get('/', ensureAuthenticated, function (req, res) {
    Question.find({
            user: req.user.id
        })
        .sort({
            'date': 'desc'
        })
        .then(questions => {
            res.render('question/index', {
                questions: questions,
                username: req.user.name.toUpperCase()
            })
        })

});

// route to direct add Questions request
router.get('/add', ensureAuthenticated, function (req, res) {
    res.render('question/add');
});

// route to direct edit a questions request
router.get('/edit/:id', ensureAuthenticated, function (req, res) {
    Question.findOne({
            _id: req.params.id
        })
        .then(question => {
            if (question.user !== req.user.id) {
                req.flash('error_msg', 'Not Authorized');
                res.redirect('/suggestions');
            } else {
                res.render('question/edit', {
                    questioned: question
                })
            }
        })
});

// route to post a Question
router.post('/', ensureAuthenticated, function (req, res) {
    const newQuestion = {
        question: req.body.question,
        user: req.user.id
    }
    new Question(newQuestion)
        .save()
        .then(question => {
            req.flash('success_msg', "Question Added");
            res.redirect('/question');
        });
});

// updating Question route using method override to do this
router.put('/:id', ensureAuthenticated, function (req, res) {
    Suggestion.find({
        question: req.params.id
    }, function (error, suggestions) {
        if (suggestions.length > 0) {
            for (var i = 0; i < suggestions.length; i++) {
                suggestions[i].questionTitle = req.body.question;
                suggestions[i].save();
            }
        }
    })
    Question.findOne({
            _id: req.params.id
        })
        .then(question => {
            question.question = req.body.question;

            question.save()
                .then(question => {
                    req.flash('success_msg', "Question Updated");
                    res.redirect('/question')
                })

        })
});

// Delete suggestions route using method override to do this
router.delete('/:id', ensureAuthenticated, function (req, res) {
    Suggestion.deleteMany({
        question: req.params.id
    }, function (error, questions) {
        console.log(questions);
    });

    Question.deleteOne({
            _id: req.params.id
        })
        .then(() => {
            req.flash('error_msg', "Question Removed");
            res.redirect('/question')
        });
});

// route to direct to answer page of particular question.
router.get('/answers/:id', ensureAuthenticated, function (req, res) {
    Question.findOne({
        _id: req.params.id
    }, function (error, question) {
        if (!error) {
            Suggestion.find({
                    question: req.params.id
                })
                .then(suggestions => {
                    if (question.user !== req.user.id) {
                        req.flash('error_msg', 'You are not authorized!');
                        res.redirect('/question');
                    } else {
                        res.render('question/answer', {
                            answers: suggestions,
                            title: question.question
                        })
                    }
                })
        }
    })
})

module.exports = router;