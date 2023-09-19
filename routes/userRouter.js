const express = require('express');
const userRouter = express.Router();
const User = require('../models/User');

// Your existing code...



userRouter.get('/api/profile', async (req, res) => {
  try {
    console.log('Received request for /api/profile');
    
    // Simulate where userId might come from. Replace with your actual logic.
    const userId = req.userId || 'some-hardcoded-userId';
    console.log(`Looking for user with ID: ${userId}`);
    
    const user = await User.findById(userId);

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    const { email, username, profile } = user;
    
    console.log('Sending user data back to client');
    res.json({
      email,
      username,
      picture: profile.picture,
      description: profile.description,
  
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = userRouter;
