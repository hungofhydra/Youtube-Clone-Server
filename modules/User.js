const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: [true, 'Name is already taken']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email is already taken']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    img: {
        type: String,
    },
    subscribers: {
        type: Number,
        default:0,
    },
    subscribedUsers: {
        type: [String]
    }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);