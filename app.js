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


const logout = require('./routes/logout');

const UserControllers = require('./controllers/UserController');
const UserRouter = require('./routes/userR');

const authenticate = require('./middleware/authenticate');

const MongoStoreFactory = require('connect-mongo');
const MongoStore = MongoStoreFactory.create({ mongoUrl: 'mongodb://localhost:27017/Barcelove' });

const app = express();
const port = process.env.PORT || 3004;



mongoose.connect('mongodb://localhost:27017/Barcelove', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database connected!');
  // Start the server after successful database connection

  // Use the MongoDB connection from Mongoose in the session store


  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());


  app.use(
    session({
      secret: 'AzQ,PI)0(',
      resave: false,
      saveUninitialized: false,
      store: MongoStore, // Use the MongoStore instance directly
      cookie: { maxAge: 1000 * 60 * 60 * 24 }, // Set the session cookie options as needed
    })
  );
 
 
  app.use('/auth', AuthRoutes);
  app.use('/login', AuthRoutes);
  app.use('/register', AuthRoutes);


  // Route for serving the login.html page
  app.get('/login', (req, res) => {
    const loginFilePath = path.join(__dirname, 'public', 'login.html');
    res.sendFile(loginFilePath);
  });


  app.get('/register', (req, res) => {
    const loginFilePath = path.join(__dirname, 'public', 'register.html');
    res.sendFile(loginFilePath);
  });


  app.use(authenticate);


  app.use('/uploads', express.static('uploads'));
  
  app.use('/challenges', challengesRouter);
  app.use('/user', UserRouter);
  app.use('/logout', logout);
  
  app.use(express.static('public'));


  // Route for the index page
  app.get('/index', (req, res) => {
    const indexFilePath = path.join(__dirname, 'public', 'index.html');
    res.sendFile(indexFilePath);
  });


  app.get('/profile', (req, res) => {
    res.sendFile(__dirname , 'public', '/profile.html');
  });
  


  //logout
  app.use('/logout', logout);
  

 
  // This middleware will serve static files from the 'public' directory
  


  app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
}).catch(err => console.log(err));


app.use('/api/user', UserRouter);
app.use('/api', AuthRoutes);