const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: {
        type: String,
        enum: {
            values: ["Super Admin","Admin", "Moderator", "User"],
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
    "role": "Admin"
}
 */
