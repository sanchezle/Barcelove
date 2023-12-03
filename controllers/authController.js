const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');
const {sendPasswordResetEmail} = require('./emailService')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// @desc Login
// @route POST /auth
// @access Public
const login = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundUser = await User.findOne({ username }).exec()

    if (!foundUser || !foundUser.active) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) return res.status(401).json({ message: 'Unauthorized' })

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": foundUser.username,
                "roles": foundUser.roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )

    const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    })

    // Send accessToken containing username and roles 
    res.json({ accessToken })
}

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await User.findOne({ username: decoded.username }).exec()

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                        "roles": foundUser.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ accessToken })
        }
    )
}


const confirmEmail = async (req, res) => {
    const { token } = req.params;

    try {
        // Verify the token
        const decodedToken = jwt.verify(token, process.env.CEMAIL_TOKEN_SECRET);

        // Update user's isVerified status
        const updatedUser = await User.findOneAndUpdate(
            { _id: decodedToken.userId },
            { isVerified: true },
            { new: true }
        );

        if (updatedUser) {
            // Redirect to a confirmation page or send a success response
            res.redirect('http://localhost:3002/emailConfirmed'); // Example redirect
            // OR
            // res.json({ message: 'Account verified successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(400).json({ message: 'Invalid or expired token' });
        } else {
            res.status(500).json({ message: 'An error occurred during the verification process' });
        }
    }
};

const resetPasswordRequest = async (req, res) => {
    try {
        // Find user by email (assuming email is in req.body)
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send('User not found.');
        }

        // Generate a reset password token and update user
        // The token generation and saving is now handled in sendPasswordResetEmail
        await sendPasswordResetEmail(user);

        res.json({ message: "Password reset email code sent" });
    } catch (error) {
        res.json({ message: "Error resetting pasword." + error.message});
    }
};

const resetPasswordConfirm = async (req, res) => {
    const { token, email, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check if the token is valid and not expired
        if (user.resetPasswordToken !== token || Date.now() > user.resetPasswordTokenExpires) {
            return res.status(400).json({ message: "Wrong code or code has expired." });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password and clear the reset token fields
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpires = undefined;
        await user.save();

        res.json({ message: "Password reset successfully." });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred: ' + error.message });
    }
};


// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}

module.exports = {

    login,
    refresh,
    logout,
    confirmEmail,
    resetPasswordRequest,
    resetPasswordConfirm 
}