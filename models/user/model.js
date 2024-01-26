const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    country: String,
    city: String,
    state: String,
    zip: Number,
    role: {
        type: String,
        enum: {
            values: ["Super Admin","Admin", "Moderator", "Client", "User"],
            message: '{VALUE} is not supported'
        }
    },
    image: Array,
    // orders details
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order' 
    }],
    // quotations details
    quotations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quotation' 
    }],
    // tickets details
    tickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket' 
    }]
}, { timestamps: true })

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;

/**
{
    "name" : "smith",
    "email": "smith@gmail.com",
    "password": "smith123",
    "country": "USA",
    "city": "new york",
    "state": "new york",
    "zip": 1234
    "role": "Admin"
}
 */
