const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: String,
    email: String,
    country: String,
    city: String,
    state: String,
    zip: Number,
    logo: Array,
},{ timestamps: true })

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