// userRouter.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Import your User model

router.get('/api/profile', async (req, res) => {
  try {
    if (!req.user && !req.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const userId = req.user ? req.user._id : req.userId; // Get user ID from either JWT or session

    const user = await User.findOne({ _id: userId }); // Retrieve user from MongoDB
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { username, email, profile, description, profilePicture } = user;
    const userData = { username, email, profile, description, profilePicture };

    res.json(userData);  // Send the extended user data as JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
