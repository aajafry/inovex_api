const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: String,
    email: String,
    country: String,
    city: String,
    state: String,
    zip: Number,
    logo: String,
    // users details
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }],
    // services details
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service' 
    }],
    // quotations details
    quotations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quotation' 
    }],
    // orders details
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order' 
    }],
    // tickets details
    tickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket' 
    }],
    // invoices details
    invoices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice' 
    }]
},{ 
    timestamps: true,
    collection: 'companies'
})

const companyModel = mongoose.model("Company", companySchema);

module.exports = companyModel;

/**
{
    "name" : "companyName",
    "email": "info@companyName.com",
    "country": "USA",
    "city": "new york",
    "state": "new york",
    "zip": 1234
}
 */