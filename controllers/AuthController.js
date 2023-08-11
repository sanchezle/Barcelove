
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');

require('dotenv').config();



sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

        // Create a confirmation token.
        const token = jwt.sign({ _id: user._id }, process.env.CEMAIL_TOKEN_SECRET, { expiresIn: '1d' });

        // Send confirmation email.
        const mailOptions = {
            from: 'barcelove01@gmail.com',
            to: user.email,
            subject: 'Account Verification Token',
            text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/auth/confirmEmail\/' + token + '\n'
        };

        sgMail
        .send(mailOptions)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        });

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
        
        if(user) {
            console.log('password:', password);
            console.log('user.password:', user.password);

            // Check if user is verified
            if (!user.isVerified) {
                return res.json({
                    message: 'Please verify your email before logging in.'
                });
            }

            let result = await bcrypt.compare(password, user.password);
            if(result) {
                let token = jwt.sign({username: user.username}, process.env.JWT_SECRET,{expiresIn: '1h'})
                
                // Set session isAuthenticated as true
                req.session.isAuthenticated = true;
                
                res.json({
                    message: 'Login Successful!',
                    token,
                    redirectTo: '/home' // Add the route you want to redirect to
                });
             
            } else {
                res.json({
                    message: 'Password does not match!'
                });
            }
        } else {
            res.json({
                message: 'No user found!'
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
    const token = req.params.token;
    
    // Verify the token
    jwt.verify(token, process.env.CEMAIL_TOKEN_SECRET, function(err, decodedToken) {
        if (err) {
            return res.status(400).json({message: 'The token is invalid or has expired.'});
        }
        const userId = decodedToken._id;

        // Update user's isVerified field to true
        User.findOneAndUpdate({_id: userId}, { isVerified: true }) // <-- Fixed the query here
        .then(() => res.json({message: 'Your account has been successfully verified!'}))
        .catch((err) => res.json({message: 'An error occurred during verification'}));
    });
};


const passwordResetRequest = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(400).send('No account with that email found');
    }
  
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
  
    const msg = {
      to: email,
      from: process.env.FROM_EMAIL,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
             Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
             http://${req.headers.host}/auth/reset-password/${token}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };
  
    sgMail.send(msg);
  
    res.send('Password reset email has been sent');
  };


  const resetPassword = async (req, res) => {
    const { token, password, confirmPassword } = req.body;
  
    if (password !== confirmPassword) {
      return res.status(400).send('Passwords do not match');
    }
  
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
  
    if (!user) {
      return res.status(400).send('Password reset token is invalid or has expired');
    }
  
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
  
    res.send('Password has been updated');
  };
  


module.exports = { register, login, confirmEmail, passwordResetRequest, resetPassword};

          

