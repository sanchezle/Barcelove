const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const profile = (req, res, next ) => {
    user.findOne({username: req.params.username})
    .then(user => {
        res.json({
            user
        })
    }
    )
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

const profileDescription = (req, res, next ) => {
    user.findOne({username: req.params.username})
    .then(user => {
        res.json({
            user
        })
    }
    )
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

const profileImage = (req, res, next ) => {
    user.findOne({username: req.params.username})
    .then(user => {
        res.json({
            user
        })
    }
    )
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

const updateProfile = (req, res, next ) => {
    user.findOneAndUpdate({username: req.params.username}, req.body)
    .then(user => {
        res.json({
            user
        })
    }
    )
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

const delteUser = (req, res, next ) => {
    user.findOneAndDelete({username: req.params.username})
    .then(user => {
        res.json({
            user
        })
    }
    )
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

module.exports = { profile, profileDescription, profileImage, updateProfile, delteUser }