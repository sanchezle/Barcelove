const express = require('express');
const Router = express.Router();
const userRouter = require('../models/User');
const AuthController = require('../models/AuthController');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


Router.post('/register', AuthController.register);
Router.post('/login', AuthController.login);

module.exports = Router;
