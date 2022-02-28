const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, default: null },
    status: { type: String, default: 'offline' },
});

module.exports = mongoose.model('user', UserSchema);