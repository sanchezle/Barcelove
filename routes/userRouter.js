const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/api/profile', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { username, email, profile } = user;
    const userData = { username, email, profile };
    res.json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
