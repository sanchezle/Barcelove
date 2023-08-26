const express = require('express');
const User = require('./models/User'); // Path to your User model
const router = express.Router();

router.put('/api/user/:id/update', async (req, res) => {
  const { id } = req.params;
  const { name, description, picture } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (name) user.profile.name = name;
    if (description) user.profile.description = description;
    if (picture) user.profile.picture = picture;

    await user.save();
    res.status(200).send(user);
  } catch (error) {
    console.error("There was an error updating the user", error);
    res.status(500).send("There was an error updating the user");
  }
});

module.exports = router;
