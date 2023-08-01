const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    profile: {
        name: { type: String, default: '' },
        description: { type: String, default: '' },
        picture: { type: String, default: '' },
    },
    wallet: {
        balance: { type: Number, default: 0 },
        currency: { type: String, default: 'USD' },
    },    userQR: { type: String, default: '' },
    challenges: {
        completed: { type: [String], default: [] },
        ongoing: { type: [String], default: [] },
    },
    score: { type: Number, default: 0 },
},{timestamps: true});

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});


const User = mongoose.model('User', userSchema);

module.exports = User;
