// register.js

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model

// Route to render the registration form
router.get('/', (req, res) => {
  res.sendFile(__dirname + '/path/to/register.html'); // Adjust the path accordingly
});

// Route to handle form submission
router.post('/', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  // Validation logic
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).send('All fields are required.');
  }

  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match.');
  }

  // Check if the username or email already exists in the database
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).send('Username or email already exists.');
    }

    // Create a new user in the database
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.send('Registration successful!'); // You can redirect to a success page or perform further actions here.
  } catch (error) {
    res.status(500).send('Error registering user.'); // Handle the error gracefully.
  }
});

module.exports = router;
