const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const loginLimiter = require('../middleware/loginLimiter')


router.route('/')
    .post(loginLimiter, authController.login)

router.route('/refresh')
    .get(authController.refresh)

router.route('/logout')
    .post(authController.logout)
// Add route for email confirmation
router.route('/confirmEmail/:token')
    .get(authController.confirmEmail)

router.route('/reset-password-request')
    .post(authController.resetPasswordRequest)

router.route('/reset-password-confirm')
    .post(authController.resetPasswordConfirm)

module.exports = router