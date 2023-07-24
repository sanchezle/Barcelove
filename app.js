const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const Challeng = require('./models/challenge');

const MongoStore = require('connect-mongo');

const fetch = require('node-fetch');


const User = require('./models/user');
const bcrypt = require('bcrypt');

const port = process.env.PORT || 3002;

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

mongoose.connect('mongodb://localhost:27017/Barcelove', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected!'))
    .catch(err => console.log(err));


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



const register = require('./routes/register');
const login = require('./routes/login');

app.use('/register', register);
app.use('/login', login);



  
  // fetch user profile
  app.get('/user/:userId', (req, res) => {
    // fetch user profile logic here
  });
  
  app.use(session({
    secret: 'SomeSecretKey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongooseConnection: mongoose.connection }),
}));

app.listen(port, () => console.log(`app listening at http://localhost:${port}`));