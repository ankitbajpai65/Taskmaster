const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 255,
    },
    password: {
        type: String,
        required: true,
    }
},
    { timestamps: true }
)

const User = mongoose.model('user', userSchema);

module.exports = User;