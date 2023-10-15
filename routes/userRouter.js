const express = require('express');
const userRouter = express.Router();
const User = require('../models/User');

// Your existing code...



userRouter.get('/', async (req, res) => {
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
      profile,
      isOwner: true,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update profile picture
userRouter.put('/picture', async (req, res) => {
  try {
    const userId = req.userId || 'some-hardcoded-userId';
    const { newPictureBase64 } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.profile.picture = newPictureBase64;

    await user.save();
    res.status(200).json({ message: 'Profile picture updated' });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current username
userRouter.get('/username', async (req, res) => {
  try {
      const userId = req.userId || 'some-hardcoded-userId';
      const user = await User.findById(userId);
      
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ username: user.username });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Update username
userRouter.put('/username', async (req, res) => {
  try {
      const userId = req.userId || 'some-hardcoded-userId';
      const { newUsername } = req.body;

      // Check if newUsername already exists
      const existingUser = await User.findOne({ username: newUsername });
      if (existingUser) {
          return res.status(400).json({ error: 'Username exists, try another one.' });
      }

      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      user.username = newUsername;
      await user.save();
      res.status(200).json({ message: 'Username updated' });

  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});






module.exports = userRouter;


