const user = require('../models/user');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const index = (req, res, next ) => {
    user.find()
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

const profile = (req, res, next ) => {
    let userID = req.body.UserID
    User.findById(userID)
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
    let userID = req.body.userID

    let updatedData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,

        profile: {
            description: req.body.description,
            image: req.body.image
        }
    }
    user.findByIdAndUpdate(userID, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'User updated successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

const createchallenge = (req, res, next ) => {
    let userID = req.body.userID
    let updatedData = {
        challenges: {
            completed: req.body.completed,
            ongoing: req.body.ongoing
        },
        score: req.body.score
    }
    user.findByIdAndUpdate(userID, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'User updated successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}




const delteUser = (req, res, next ) => {
    let userID = req.body.userID
    user.findByIdAndRemove(userID)
    .then(() => {
        res.json({
            message: 'User deleted successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}


module.exports = {index, profile, profileDescription, profileImage, updateProfile, createchallenge, delteUser }