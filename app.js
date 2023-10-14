// External modules
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv').config();
const fetch = require('node-fetch');
const url = require('url');
const cors = require('cors');




// Internal modules
const User = require('./models/User');
const AuthRoutes = require('./routes/auth');
const logout = require('./routes/logout');
const userRouter = require('./routes/userRouter');
const authenticate = require('./middleware/authenticate');
const MongoStoreFactory = require('connect-mongo');

// Variables
const app = express();
const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Functions
function encodeMongoURI(uri) {
    const parsedUri = url.parse(uri, true);
    delete parsedUri.search;
    for (let key in parsedUri.query) {
        parsedUri.query[key] = encodeURIComponent(parsedUri.query[key]);
    }
    return url.format(parsedUri);
}

const encodedMongoURI = encodeMongoURI(MONGODB_URI);

const MongoStore = MongoStoreFactory.create({ mongoUrl: encodedMongoURI });

mongoose.connect(encodedMongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to database');

    // Middlewares
    app.use(cors());
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: '10mb' }));
    app.use(session({
        secret: process.env.SECRET_SESSION_TOKEN,
        resave: false,
        saveUninitialized: true,
        store: MongoStore,
        cookie: { maxAge: 60000 * 30 }
    }));
    app.use((req, res, next) => {
        console.log('Session data:', req.session);
        next();
    });
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/dist', express.static(path.join(__dirname, 'dist')));

    // Routes


    // Static file routes
    
    app.get('/login', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'login.html'));
    });
    app.get('/register', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'register.html'));
    });
    app.get('/password-reset-request', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'resetpassword.html'));
    });
    app.get('/auth/reset-password/:token', (req, res) => {
        res.sendFile(path.join(__dirname, 'public','reset-password.html'));
    });
    
    
    app.use('/auth', AuthRoutes);

    const privateRouter = express.Router();
    privateRouter.use(authenticate);
    privateRouter.get('/home', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'home.html'));
    });
    privateRouter.use('/api/profile', userRouter);

    privateRouter.get('/logout', logout);

    app.use('/', privateRouter);



    app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
})
.catch(err => console.log(err));
