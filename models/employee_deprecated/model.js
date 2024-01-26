const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
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

const employeeModel = mongoose.model("Employee", employeeSchema);

module.exports = employeeModel;

/**
{
    "name" : "smith",
    "email": "smith@gmail.com",
    "role": "Admin"
}
 */
