const user = require('../models/user');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const jwt = require('jsonwebtoken');


const profile = (req, res, next ) => {
    let userprofile = req.body.profile
    user.findOne(userprofile)
    .then(response => {
        res.json({
            response
        })
    })
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
    let UserID = req.body
    user.findOne({username: req.params.username})
    .then(response => {
        res.json({ 
            response
        })
    })
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