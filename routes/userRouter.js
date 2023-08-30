const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Adjust the path to where your User model resides

router.get('/api/Profile', async (req, res) => {
  try {
    // Replace req.userId with the actual logic to get user's ID. 
    // This could be from the request, a decoded JWT token, etc.
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { username, profile } = user;

    res.json({
      username,
      picture: profile.picture,
      description: profile.description,
    });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
