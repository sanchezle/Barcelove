const jwt = require('jsonwebtoken');
const session = require('express-session');
const MongoStoreFactory = require('connect-mongo')
const mongoose = require('mongoose');

const MongoStore = MongoStoreFactory.create({ mongoUrl: 'mongodb://localhost:27017/Barcelove' });



const authenticate = (req, res, next) => {
  // Check for JWT token in the request headers
  const token = req.header('Authorization');

  // If JWT token exists, verify it
  if (token) {
    jwt.verify(token, 'AzQ,PI)0(', (err, decoded) => {
      if (err) {
        // Invalid or expired token
        return res.status(401).json({ message: 'Invalid or expired token.' });
      } else {
        // Token is valid, add the user information to the request object (optional)
        req.user = decoded;
        next();
      }
    });
  } else {
    // If there's no JWT token, check for session-based authentication
    if (req.session && req.session.isAuthenticated) {
      // User is authenticated, proceed to the next middleware/route handler
      next();
    } else {
      // User is not authenticated, redirect to the login page if the requested URL is not already /login
      if (req.originalUrl !== '/login') {
        return res.redirect('/login');
      }

      // If the requested URL is /login and the user is not authenticated,
      // proceed to the next middleware/route handler to serve the login page
      next();
    }
  }
};


module.exports = authenticate;