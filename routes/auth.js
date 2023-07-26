const express = require('express');
const userRouter = require('./routes/user');
const authController = require('./controllers/AuthController');
const session = require('express-session');

Router.post('/register', authController.register);
Router.post('/login', authController.login);

module.exports = Router;
