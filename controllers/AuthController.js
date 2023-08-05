
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();


sgMail.setApiKey(process.env);

const register = async (req, res, next ) => {
    let password = req.body.password;
    let passwordConfirm = req.body.passwordConfirm;

        // Password Strength Validation
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.json({
            message: 'Password should have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character'
        });
    }

    // Check if passwords match
    if(password !== passwordConfirm){
        return res.json({
            message: 'Passwords do not match!'
        });
    }
    
    // Create the user
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password, // Password will be hashed in pre-save middleware
        username: req.body.username,
    })

    // Save the user
    user.save()
    .then(user => {
        res.json({
            message: 'User Added Successfully!'
        })
    })
    .catch(error => {
        res.status(500).json({
            message: 'An error occurred!'
        })
        console.error(error);
    })
}



const login = async (req, res, next) => {
    try {
        var username = req.body.username;
        var password = req.body.password;
        var user = await User.findOne({$or: [{email:username},{username:username}]});
        if(user){
            console.log('password:', password);
            console.log('user.password:', user.password);
            let result = await bcrypt.compare(password, user.password);
            if(result){
                let token = jwt.sign({username: user.username}, process.env.JWT_SECRET,{expiresIn: '1h'})
                
                // Set session isAuthenticated as true
                req.session.isAuthenticated = true;
                
                res.json({
                    message: 'Login Successful!',
                    token,
                    redirectTo: '/home' // Add the route you want to redirect to
                })
             
            }else{
                res.json({
                    message: 'Password does not matched!'
                });
            }
        }else{
            res.json({
                message: 'No user found!:('
            });
        }
    } catch(error) {
        res.json({
            message: 'An error occurred during login!',
            error: error.message 
        });
    }
}


const confirmEmail = (req, res) => {
    try {
        const emailToken = req.params.token;
        const payload = jwt.verify(emailToken, 'secret'); // verify token

        // find user by id and set emailConfirmed to true
        User.findByIdAndUpdate(payload.id, { emailConfirmed: true }, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Error confirming email' });
            } else {
                res.json({
                    message: 'Email confirmed successfully'
                })
            }
        });
    } catch (e) {
        res.status(400).json({ error: 'Invalid token' });
    }
}

module.exports = { register, login, confirmEmail }; // add confirmEmail

          

