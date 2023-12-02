const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const User = require('../models/User'); // Import your User model


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Updated sendConfirmationEmail function to include the verification link as a parameter
const sendConfirmationEmail = async (user, verificationLink) => {
    // Generate a verification token and save it in the database
    const verificationToken = Math.floor(100000 + Math.random() * 900000); // 6-digit token
    user.verificationToken = verificationToken.toString();
    user.verificationTokenExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();

    const mailOptions = {
        from: 'barcelove01@gmail.com',
        to: user.email,
        subject: 'Account Verification Token',
        text: `Hello,\n\nPlease verify your account by clicking the following link: ${verificationLink}\n`
    };

    return sgMail.send(mailOptions);
};
// Updated sendPasswordResetEmail function
const sendPasswordResetEmail = async (user) => {
    // Generate a reset password token and save it in the database
    const resetPasswordToken = Math.floor(100000 + Math.random() * 900000); // 6-digit token
    user.resetPasswordToken = resetPasswordToken.toString();
    user.resetPasswordTokenExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();

    const msg = {
        to: user.email,
        from: 'barcelove01@gmail.com',
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
               Please use the following token to reset your password: ${resetPasswordToken}\n\n
               If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };
    return sgMail.send(msg);
};

module.exports = { sendConfirmationEmail, sendPasswordResetEmail };
