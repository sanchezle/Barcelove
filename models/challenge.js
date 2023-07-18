const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChallengeSchema = new Schema({
    completed: { type: Boolean, default: false },
    currentScore: { type: Number, default: 0 },
    locations: [
        { name: 'Location 1', confirmed: false, score: 50 },
        { name: 'Location 2', confirmed: false, score: 50 },
        { name: 'Location 3', confirmed: false, score: 50 },
        { name: 'Location 4', confirmed: false, score: 50 },
        { name: 'Arc of Triumph', confirmed: false, score: 50 },
    ]
});

module.exports = mongoose.model('Challenge', ChallengeSchema);
