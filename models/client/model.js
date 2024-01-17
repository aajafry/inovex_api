const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: String,
    email: String,
    country: String,
    city: String,
    state: String,
    zip: Number,
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
},{ timestamps: true })

const clientModel = mongoose.model("Client", clientSchema);

module.exports = clientModel;

/**
{
    "name" : "Jon",
    "email": "jon@gmail.com",
    "country": "USA",
    "city": "new york",
    "state": "new york",
    "zip": 1234
}
 */