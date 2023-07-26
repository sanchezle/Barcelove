const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    wallet: {
        balance: { type: Number, default: 0 },
        currency: { type: String, default: 'USD' },
    },
    challenges: {
        completed: { type: [String], default: [] },
        ongoing: { type: [String], default: [] },
    },
    score: { type: Number, default: 0 },
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
