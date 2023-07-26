const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    name: String,  // name of the location
    score: Number,  // score for this location
    confirmed: { type: Boolean, default: false }  // whether the user has been to this location
});

const ChallengeSchema = new Schema({
    name: String,  // name of the challenge
    locations: [LocationSchema],  // array of locations
    completed: { type: Boolean, default: false },  // whether the challenge is completed
    currentScore: { type: Number, default: 0 },  // current accumulated score
    totalScore: Number  // total score for the challenge
});



module.exports = mongoose.model('Challenge', ChallengeSchema);
