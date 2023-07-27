const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const Challeng = require('./models/challenge');
const path = require('path');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const { template } = require('lodash');
const authController = require('./controllers/auth');

const port = 3000;

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

mongoose.connect('mongodb://localhost:27017/Barcelove', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected!'))
    .catch(err => console.log(err));

//index route

app.get('/', (req, res) => {
  res.sendFile(path.join(templates, 'views', 'index.html'));
});


// user registration
app.post('/register', (req, res) => {
    // registration logic here
  });
  
  // user login
  app.post('/login', (req, res) => {
    // login logic here
  });
  
  // fetch user profile
  app.get('/user/:userId', (req, res) => {
    // fetch user profile logic here
  });
  
user();

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));