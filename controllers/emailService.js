const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendConfirmationEmail = (user, token, host) => {
    const mailOptions = {
        from: 'barcelove01@gmail.com',
        to: user.email,
        subject: 'Account Verification Token',
        text: `Hello,\n\nPlease verify your account by clicking the link:\nhttp://${host}/auth/confirmEmail/${token}\n`
    };
    return sgMail.send(mailOptions);
};

const sendPasswordResetEmail = (user, token, host) => {
    const msg = {
        to: user.email,
        from: 'barcelove01@gmail.com',
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
               Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
               http://${host}/auth/reset-password/${token}\n\n
               If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };
    return sgMail.send(msg);
};

module.exports = { sendConfirmationEmail, sendPasswordResetEmail };
