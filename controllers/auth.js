const express = require('express');
const Router = express.Router();
const userRouter = require('../models/User');
const authController = require('./AuthController');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


Router.post('/register', authController.register);
Router.post('/login', authController.login);

module.exports = Router;
