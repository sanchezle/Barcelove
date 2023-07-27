const user = require('./routes/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');



const register = (req, res, next ) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error:err
            })
        }
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
            username: req.body.username,
        })
        user.save()
        .then(user => {
            res.json({
                message: 'User Added Successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occured!'
            })
        })
    })
}

const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({$or: [{email:username},{username:username}]})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    res.json({
                        error:err
                    })
                    if (result){
                        let token = jwt.sign({name: user.name}, 'verySecrestValue', {expiresIn: '1h'})
                        res.json({

                            message: 'Login Successful!',
                            token
                        })

                    }else{
                        res.json({
                            message: 'Password does not match!'
                        })
                    }
                        res.json({
                            message: 'No user found!'
                        })
                    }

                })
            }
        })
    }
    




module.exports = { register, login };