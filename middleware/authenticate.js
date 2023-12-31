const jwt = require('jsonwebtoken');
const session = require('express-session');
const MongoStoreFactory = require('connect-mongo');
const mongoose = require('mongoose');
require('dotenv').config();

const MongoStore = MongoStoreFactory.create({ mongoUrl: process.env.MONGODB_URI });

const authenticate = (req, res, next) => {
  if (req.path.startsWith('/auth/reset-password')) {
    return next(); // Skip the session check for reset password routes.
  }

  // Check for JWT token in the request headers
  const token = req.header('Authorization');

  // If JWT token exists, verify it
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
      } else {
        req.userId = decoded.id || decoded._id; // Add user ID to req object
        req.user = decoded;
        next();
      }
    });
  } else {
    // If there's no JWT token, check for session-based authentication
    if (req.session && req.session.isAuthenticated) {
      req.userId = req.session.userId; // Assuming the user ID is stored in the session
      if (req.originalUrl === '/login' || req.originalUrl === '/') {
        return res.redirect('/home');
      }
      next();
    } else {
      if (req.originalUrl !== '/login') {
        return res.redirect('/login');
      }
      next();
    }
  }
};

module.exports = authenticate;
