const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const Challeng = require('./models/challenge');
const fetch = require('node-fetch');
const User = require('./models/User');
const bcrypt = require('bcrypt');

const MongoStoreFactory = require('connect-mongo');
const MongoStore = MongoStoreFactory.create({ mongoUrl: 'mongodb://localhost:27017/Barcelove' });

const app = express();
const port = process.env.PORT || 3001;

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

mongoose.connect('mongodb://localhost:27017/Barcelove', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database connected!');
  // Start the server after successful database connection

  // Use the MongoDB connection from Mongoose in the session store
  app.use(
    session({
      secret: 'your_secret_key',
      resave: false,
      saveUninitialized: false,
      store: MongoStore, // Use the MongoStore instance directly
      cookie: { maxAge: 1000 * 60 * 60 * 24 }, // Set the session cookie options as needed
    })
  );

  app.use(express.static('public'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  //middleware  
  const register = require('./routes/register');
  const login = require('./routes/login');

  app.use(register);
  app.use(login);

  // fetch user profile
  app.get('/user/:userId', (req, res) => {
    // fetch user profile logic here
  });

  app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
}).catch(err => console.log(err));
