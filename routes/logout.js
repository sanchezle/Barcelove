const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
  // Clear the user session to log out
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    } else {
      // Redirect to the login page after logout
      res.redirect('/login');
    }
  });
});

module.exports = router;