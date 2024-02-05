const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    // client name
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    country: String,
    city: String,
    state: String,
    zip: Number,
    // service name
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service' 
    },
    // order id
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order' 
    },
    payableAmt: Number,
    discAmt: Number,
    paidAmt: Number,
    dueAmt: Number,
    totalAmt: Number,
    status: {
        type: String,
        enum: {
            values: ["Paid","Unpaid"],
            message: '{VALUE} is not supported'
        }
    },
    note: String,

},{ timestamps: true })

const invoiceModel = mongoose.model("Invoice", invoiceSchema);

module.exports = invoiceModel;

/**
{
    "country": "USA",
    "city": "new york",
    "state": "new york",
    "zip": 1234,
    "payableAmt": 100,
    "discAmt": 10,
    "paidAmt": 70,
    "dueAmt": 20,
    "totalAmt": 80,
    "status": "Paid",
    note: "thanks for the purchase."
}
 */