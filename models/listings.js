const mongoose = require('mongoose')

const ListingsSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,        
    },
    description: {
        type: String, 
        required: true,
        maxLength: 1000,
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postal_code: {
        type: String,
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,        
        validate: function(value) {
            var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(value);
        },
    },
    username: {
        type: String,
        required: [true, 'Please enter your username'],        
    },
});

const Listings = mongoose.model("Listings", ListingsSchema)
module.exports = Listings