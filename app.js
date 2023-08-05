const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const Challenge = require('./models/challenge');
const fetch = require('node-fetch');
const User = require('./models/User');
const challengesRouter = require('./routes/challengesR');
const AuthRoutes = require('./routes/auth');
const dotenv = require('dotenv');

const logout = require('./routes/logout');

const UserControllers = require('./controllers/UserController');
const UserRouter = require('./routes/userR');

const authenticate = require('./middleware/authenticate');

const MongoStoreFactory = require('connect-mongo');
const MongoStore = MongoStoreFactory.create({ mongoUrl: 'mongodb://localhost:27017/Barcelove' });

const app = express();
const port = process.env.PORT || 3042;

require('dotenv').config();


  mongoose.connect('mongodb://localhost:27017/Barcelove', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Database connected!');
  // Start the server after successful database connection

  // Use the MongoDB connection from Mongoose in the session store

  app.use(session({
    secret: 'fuckingshit0408',
    resave: false,
    saveUninitialized: true,
    store: MongoStore,
    cookie: { maxAge: 60000 * 30 } // Session expires after 30 minutes
  }));
  

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  

  app.get('/login', (req, res) => {
    const loginFilePath = path.join(__dirname, 'public', 'login.html');
    res.sendFile(loginFilePath);
  });


  app.get('/register', (req, res) => {
    const loginFilePath = path.join(__dirname, 'public', 'register.html');
    res.sendFile(loginFilePath);
  });
  

  app.use(express.static(path.join(__dirname, 'public')));
  

  app.use('/auth', AuthRoutes);

    
  const privateRouter = express.Router();

  privateRouter.use(authenticate);
  privateRouter.get('/home', (req, res) => {
      const indexFilePath = path.join(__dirname, 'public', 'home.html');
      res.sendFile(indexFilePath);
  });

    //profile router
    privateRouter.get('/profile', (req, res) => {
      const indexFilePath = path.join(__dirname, 'public', 'profile.html');
    });
    privateRouter.get('/chalenges',  (req, res) => {
      const indexFilePath = path.join(__dirname, 'public', 'chalenges.html');
    });
    
    privateRouter.get('/user', (req, res) => {
      const indexFilePath = path.join(__dirname, 'public', 'user.html');
    });
    privateRouter.get('/logout', (req, res) => {
        req.session.destroy(function(err) {
          if(err) {
              console.log(err);
              res.status(500).json({ message: 'Error logging out. Please try again.' });
          } else {
              res.status(200).json({ message: 'Logged out successfully' });
          }
      });
      
    });

  app.use('/', privateRouter);


  

 



  app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
}).catch(err => console.log(err));

