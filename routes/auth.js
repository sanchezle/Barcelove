const express = require('express');
const Router = express.Router();
const AuthController = require('../controllers/AuthController');



Router.post('/register', AuthController.register);
Router.post('/login', AuthController.login);

module.exports = Router;
