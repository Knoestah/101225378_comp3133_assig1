const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter your username: '],
        trim: true,
        lowercase: true
    },
    firstname: {
        type: String,
        required: [true, 'Please enter your first name'],
        trim: true,
        lowercase: true
    },
    lastname: {
        type: String,
        required: [true, 'Please enter your last name'],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        validate: function(value) {
            regex = /^[A-Za-z0-9#$&_]+$/
            return regex.test(value);
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true,
        validate: function(val) {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(val);
        }
    },
    type: {
        type: String,        
        enum: ["USER", "ADMIN"]    
        
    }
});

const Users = mongoose.model("Users", UsersSchema)
module.exports = Users