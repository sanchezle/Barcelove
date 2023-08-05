const express = require('express');
const Router = express.Router();
const AuthController = require('../controllers/AuthController');



Router.post('/register', AuthController.register);
Router.post('/login', AuthController.login);
Router.get('/confirmEmail/:token', AuthController.confirmEmail); // new route


module.exports = Router;
