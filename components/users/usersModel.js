const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Users', userSchema);