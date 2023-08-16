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


const authenticate = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();



const url = require('url');

const MONGODB_URI = process.env.MONGODB_URI;

function encodeMongoURI(uri) {
  const parsedUri = url.parse(uri, true);  // Parse the URI and its query parameters
  delete parsedUri.search;  // The search property is derived from the query and needs to be deleted for formatting.

  // URL-encode each query parameter
  for (let key in parsedUri.query) {
    parsedUri.query[key] = encodeURIComponent(parsedUri.query[key]);
  }

  // Reformat the URI with the encoded query parameters
  return url.format(parsedUri);
}

// Access the MONGODB_URI environment variable here
const encodedMongoURI = encodeMongoURI(MONGODB_URI);



const MongoStoreFactory = require('connect-mongo');
const MongoStore = MongoStoreFactory.create({ mongoUrl: encodedMongoURI });

console.log(encodedMongoURI);
console.log(MONGODB_URI);
// Now use the encoded URI in your Mongoose and MongoStoreFactory calls
mongoose.connect(encodedMongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to database');

  app.use(session({
    secret: process.env.SECRET_SESSION_TOKEN,
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
    const registerFilePath = path.join(__dirname, 'public', 'register.html');
    res.sendFile(registerFilePath);
  });

  app.get('/password-reset-request', (req, res) => {
    const requestPasswordFilePath = path.join(__dirname, 'public', 'resetpassword.html');
    res.sendFile(requestPasswordFilePath);
  });

  app.get('/auth/reset-password/:token', (req, res) => {
    const restePassword = (path.join(__dirname, 'public','reset-password.html'));
    res.sendFile(restePassword);
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

