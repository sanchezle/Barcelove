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
const morgan = require('morgan');
const { response } = require('express');
const logout = require('./routes/logout');

const UserControllers = require('./userControllers');
const UserRouter = require('./routes/userR');

const MongoStoreFactory = require('connect-mongo');
const MongoStore = MongoStoreFactory.create({ mongoUrl: 'mongodb://localhost:27017/Barcelove' });

const app = express();
const port = process.env.PORT || 3005;

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

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
    
  //middleware  
  app.get('/profile', (req, res) => {
    res.sendFile(__dirname , 'public', '/profile.html');
  });
  

  const challenges = require('./routes/challengesR');
  const authRoutes = require('./controllers/auth');



  app.use('/challenges', challenges);
  app.use('/auth', authRoutes);
  app.use('/user', UserRouter);



  // Route for the login page
  app.get('/login', (req, res) => {
    const loginFilePath = path.join(__dirname, 'public', 'login.html');
    res.sendFile(loginFilePath);
  });

  // Route for the index page
  app.get('/index', authRoutes, (req, res) => {
    const indexFilePath = path.join(__dirname, 'public', 'index.html');
    res.sendFile(indexFilePath);
  });

  //logout
  app.use('/logout', logout);
  

 
  // This middleware will serve static files from the 'public' directory
  app.use(express.static('public'));


  app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
}).catch(err => console.log(err));


app.use('/api/user', UserRouter);