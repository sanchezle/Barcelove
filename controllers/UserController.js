const User = require('../models/User')

const index = (req, res, next ) => {
    User.find()
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
    let userID = req.body.userID
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
    User.findByIdAndUpdate(userID, {$set: updatedData})
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
    User.findByIdAndUpdate(userID, {$set: updatedData})
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
    User.findByIdAndRemove(userID)
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


module.exports = {index, profile, updateProfile, createchallenge, delteUser }