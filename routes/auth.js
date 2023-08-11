const express = require('express');
const Router = express.Router();
const AuthController = require('../controllers/AuthController');



Router.post('/register', AuthController.register);
Router.post('/login', AuthController.login);
Router.get('/confirmEmail/:token', AuthController.confirmEmail);
Router.post('/password-reset-request', AuthController.passwordResetRequest);
Router.post('/reset-password/:token', AuthController.resetPassword);

Router.get('/logout', (req, res) => {
    // Your logout logic here, for example:
    req.session.destroy(); // If you're using express-session
    res.status(200).send("Logged out successfully");
});





module.exports = Router;
