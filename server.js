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
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const {logger, logEvents} = require('./middleware/logger');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbconn')


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


    // Middlewares
    connectDB();

    app.use(logger);
    
    app.use(express.json());
    
    app.use(cookieParser());



    app.use(cors(corsOptions));
    
    app.use(morgan('dev'));
    
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use(bodyParser.json({ limit: '10mb' }));
    
    //app.use(session({
        ///secret: process.env.SECRET_SESSION_TOKEN,
        //resave: false,
        //saveUninitialized: true,
        //store: MongoStore,
        ///cookie: { maxAge: 60000 * 30 }
    //}));
    ///app.use((req, res, next) => {
       // console.log('Session data:', req.session);
        //next();
    //});
    
    app.use('/', express.static(path.join(__dirname, 'public')));

    // Routes
    app.use('/', require('./routes/root'));


    //app.get('/login', (req, res) => {
        //res.sendFile(path.join(__dirname, 'public', 'login.html'));
    //});
    //app.get('/register', (req, res) => {
        //res.sendFile(path.join(__dirname, 'public', 'register.html'));
    //});
    //app.get('/password-reset-request', (req, res) => {
      //  res.sendFile(path.join(__dirname, 'public', 'resetpassword.html'));
    //});
    //app.get('/auth/reset-password/:token', (req, res) => {
     //   res.sendFile(path.join(__dirname, 'public','reset-password.html'));
    //});
    
    
    //app.use('/auth', AuthRoutes);

    //const privateRouter = express.Router();
    ///privateRouter.use(authenticate);
    //.use('/', privateRouter);

    app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
    })



    app.use(errorHandler);


    mongoose.connection.once('open', () => {
        console.log('Connected to MongoDB')
        app.listen(port, () => console.log(`Server running on in http://localhost:${port}`))
    })
    
    mongoose.connection.on('error', err => {
        console.log(err)
        logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
    })
