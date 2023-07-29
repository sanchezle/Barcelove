const express = require('express');
const router = express.Router();

const UserControllers = require('../controllers/UserControllers');

router.get('/profile', UserControllers.profile);
router.get('/profile/:id', UserControllers.profile);
router.get('/userlist', UserControllers.index);
router.post('/update-profile', UserControllers.updateProfile);
router.post('/createChallenge', UserControllers.createChallenge);
router.post('/updateProfile', UserControllers.updateProfile);

module.exports = router;
