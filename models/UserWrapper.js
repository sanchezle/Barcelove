// Import the User model using require
const User = require('./User');

// Re-export it using CommonJS syntax
module.exports = User;

// Also export it using ES6 syntax
exports.default = User;
