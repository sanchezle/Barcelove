const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const Challeng = require('./models/challenge');
const fetch = require('node-fetch');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const path = require('path');

const MongoStoreFactory = require('connect-mongo');
const MongoStore = MongoStoreFactory.create({ mongoUrl: 'mongodb://localhost:27017/Barcelove' });

const app = express();
const port = process.env.PORT || 3000;

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

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
    
  //middleware  




  // Custom middleware to check if the user is logged in
  function isLoggedIn(req, res, next) {
    if (req.session.user) {
      // User is logged in, proceed to the next middleware or route handler
      next();
    } else {
      // User is not logged in
      // Redirect to the login page if the requested URL is not '/login'
      if (req.originalUrl !== '/login') {
        return res.redirect('/login');
      }
      // If the requested URL is '/login', proceed to serve the login.html file
      next();
    }
  }

  // Route for the login page
  app.get('/login', (req, res) => {
    const loginFilePath = path.join(__dirname, 'public', 'login.html');
    res.sendFile(loginFilePath);
  });

  // Route for the index page
  app.get('/index', isLoggedIn, (req, res) => {
    const indexFilePath = path.join(__dirname, 'public', 'index.html');
    res.sendFile(indexFilePath);
  });

  const challenges = require('./routes/challengesR');
  const authRoutes = require('./controllers/auth');



  app.use('/challenges', isLoggedIn, challenges);
  app.use('/auth', isLoggedIn, authRoutes);

 
  // This middleware will serve static files from the 'public' directory
  app.use(express.static('public'));


  app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
}).catch(err => console.log(err));
