const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const upload = require('../middleware/upload');

const aunthenticate = require('../middleware/authenticate');

router.get('/', authenticate,UserController.index); 
router.post('/store', upload.single('profile.picture'), UserController.store);
router.post('/register', upload.single('profile/picture'), UserController.store);
router.post('/update-profile', upload.single('profile.picture'), UserController.updateProfile);
router.get('/profile', UserController.profile);
router.get('/profile/:id', UserController.profile);
router.get('/userslist', UserController.index);
router.post('/update-profile', UserController.updateProfile);
router.post('/createChallenge', UserController.createChallenge);
router.post('/updateProfile', UserController.updateProfile);

module.exports = router;
