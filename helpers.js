const pasport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const OAuth2Strategy = require('passport-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;


const createNewChallenge = (challengeName, locations, totalScore) => {
    return new Challenge({
        name: challengeName,
        locations: locations,
        totalScore: totalScore
    });
}


module.exports = createNewChallenge;