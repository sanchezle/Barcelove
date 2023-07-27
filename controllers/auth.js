const express = require('express');
const userRouter = require('../models/User');
const authController = require('./controllers/AuthController');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


Router.post('/register', authController.register);
Router.post('/login', authController.login);

module.exports = Router;
