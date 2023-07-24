const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const Challeng = require('./models/challenge');

const fetch = require('node-fetch');


const User = require('./models/user');
const bcrypt = require('bcrypt');

const port = process.env.PORT || 3001;

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

mongoose.connect('mongodb://localhost:27017/Barcelove', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected!'))
    .catch(err => console.log(err));


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/public/index.html');
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
  

app.listen(port, () => console.log(`app listening at http://localhost:${port}`));