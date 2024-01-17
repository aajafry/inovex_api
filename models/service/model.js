const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: String,
    brif: String,
    attachment: Array,
    duration: String,
    paymentTerm: {
        type: String,
        enum: {
            values: ["Pay with Invoice","Pay with Instalment"],
            message: '{VALUE} is not supported'
        }
    },
    price: Number,
}, { timestamps: true })

const serviceModel = mongoose.model("Service", serviceSchema);

module.exports = serviceModel;

/**
{
    "name" : "digital marketing",
    "brif": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>",
    "attachment": [],
    "duration": "2 month",
    "paymentTerm": "Pay with Invoice",
    "price": 500
}
**/