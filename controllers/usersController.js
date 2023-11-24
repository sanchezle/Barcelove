const User = require('../models/User')
const Note = require('../models/Note')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const { sendConfirmationEmail } = require('./emailService'); // Importing the email service
const jwt = require('jsonwebtoken');



// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const users = await User.find().select('-password').lean()

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles, email } = req.body;

    // Confirm data
    if (!username || !password || !email || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check for duplicate username
    const duplicateUsername = await User.findOne({ username }).lean().exec();

    if (duplicateUsername) {
        return res.status(409).json({ message: 'Duplicate username' });
    }

    // Check for duplicate email (optional, if you want to ensure unique emails)
    const duplicateEmail = await User.findOne({ email }).lean().exec();

    if (duplicateEmail) {
        return res.status(409).json({ message: 'Duplicate email' });
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

    const userObject = { username, "password": hashedPwd, roles, email };

    // Create and store new user 
    const user = await User.create(userObject);

    if (user) { //created 
        res.status(201).json({ message: `New user ${username} created` });
    } else {
        res.status(400).json({ message: 'Invalid user data received' });
    }
});

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, roles, active, password } = req.body

    // Confirm data 
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate 
    const duplicate = await User.findOne({ username }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username
    user.roles = roles
    user.active = active

    if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the user still have assigned notes?
    const note = await Note.findOne({ user: id }).lean().exec()
    if (note) {
        return res.status(400).json({ message: 'User has assigned notes' })
    }

    // Does the user exist to delete?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
})



const registerUser = asyncHandler(async (req, res) => {
    const { username, password, roles, email } = req.body;

    // Confirm data
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Username, password, and email are required' });
    }

    // Check for duplicate username
    const duplicateUsername = await User.findOne({ username }).lean().exec();
    if (duplicateUsername) {
        return res.status(409).json({ message: 'Duplicate username' });
    }

    // Check for duplicate email
    const duplicateEmail = await User.findOne({ email }).lean().exec();
    if (duplicateEmail) {
        return res.status(409).json({ message: 'Duplicate email' });
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10);

    // Create user object
    const userObject = { username, password: hashedPwd, roles, email };

    // Create and store new user
    const user = await User.create(userObject);

    if (user) {
        // User created successfully, now send confirmation email
        const token = jwt.sign({ userId: user._id }, process.env.CEMAIL_TOKEN_SECRET, { expiresIn: '1d' });
        
        sendConfirmationEmail(user, token, req.headers.host)
            .then(() => console.log('Confirmation email sent'))
            .catch((error) => console.error('Error sending email:', error));
        
        res.status(201).json({ message: `New user ${username} created` });
    } else {
        res.status(400).json({ message: 'Invalid user data received' });
    }
});



module.exports = {
    getAllUsers,
    registerUser,
    createNewUser,
    updateUser,
    deleteUser
}