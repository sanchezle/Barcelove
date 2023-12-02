const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    email: { type: String, required: false, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    profile: {
        name: { type: String, default: '' },
        description: { type: String, default: '' },
        picture: { type: String, default: '' },
    },
    roles: [{
        type: String,
        default: "Employee"
    }],
    active: {
        type: Boolean, 
        default: true
    },
    wallet: {
        balance: { type: Number, default: 0 },
        currency: { type: String, default: 'USD' },
    },
    userQR: { type: String, default: '' },
    challenges: {
        completed: { type: [String], default: [] },
        ongoing: { type: [String], default: [] },
    },
    score: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    
    // Added fields for password reset
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },

    verificationToken: {type: String, default: null},
    verificationTokenExpires: {type: String, default: null},

}, { timestamps: true });




const User = mongoose.model('User', userSchema);

module.exports = User;
