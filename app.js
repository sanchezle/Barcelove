// Required Libraries
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const url = require('url');
const dotenv = require('dotenv');

// Importing Modules
const User = require('./models/User');
const AuthRoutes = require('./routes/auth');
const logout = require('./routes/logout');
const userRouter = require('./routes/userRouter');
const authenticate = require('./middleware/authenticate');

// Initial Configuration
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Utility Functions
function encodeMongoURI(uri) {
  const parsedUri = url.parse(uri, true);
  delete parsedUri.search;

  for (let key in parsedUri.query) {
    parsedUri.query[key] = encodeURIComponent(parsedUri.query[key]);
  }

  return url.format(parsedUri);
}

// MongoDB Configuration
const encodedMongoURI = encodeMongoURI(MONGODB_URI);
const MongoStoreFactory = require('connect-mongo');
const MongoStore = MongoStoreFactory.create({ mongoUrl: encodedMongoURI });

// Connect to MongoDB
mongoose.connect(encodedMongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to database');

  // Middleware Configuration
  const helmet = require('helmet');

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'script-src': ["'self'","http://localhost:3000", "https://unpkg.com"]
    },
  })
);

  app.use(session({
    secret: process.env.SECRET_SESSION_TOKEN,
    resave: false,
    saveUninitialized: true,
    store: MongoStore,
    cookie: { maxAge: 60000 * 30 }
  }));
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/dist', express.static(path.join(__dirname, 'dist')));

  // Custom Middleware
  const logSession = (req, res, next) => {
    console.log('Session data:', req.session);
    next();
  };
  app.use(logSession);

  // Routes
  app.use('/auth', AuthRoutes);
  const privateRouter = express.Router();
  privateRouter.use(authenticate);

  app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'public', 'login.html')));
  app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'public', 'register.html')));
  app.get('/password-reset-request', (req, res) => res.sendFile(path.join(__dirname, 'public', 'resetpassword.html')));
  app.get('/auth/reset-password/:token', (req, res) => res.sendFile(path.join(__dirname, 'public','reset-password.html')));

  privateRouter.get('/home', (req, res) => res.sendFile(path.join(__dirname, 'public', 'home.html')));
  privateRouter.get('/api/profile', userRouter);
  privateRouter.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'Error logging out. Please try again.' });
      } else {
        res.status(200).json({ message: 'Logged out successfully' });
      }
    });
  });

  app.use('/', privateRouter);

  // Starting Server
  app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

}).catch(err => console.log(err));
