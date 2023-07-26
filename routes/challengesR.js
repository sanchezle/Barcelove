const express = require('express');
const userRouter = require('./routes/user');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const Challeng = require('./models/challenge');
const fetch = require('node-fetch');

const newChallenge = require('./helpers');

Router.post('/newChallenge', (req, res) => {
    const challengeName = req.body.challengeName;
    const locations = req.body.locations;
    const totalScore = req.body.totalScore;
    const newChallenge = createNewChallenge(challengeName, locations, totalScore);
    newChallenge.save((err, challenge) => {
        if (err) {
            console.log(err);
        } else {
            res.send(challenge);
        }
    });
});

module.exports = Router;
// Path: barcelove/routes/user.js