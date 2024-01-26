const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
    // service name
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service' 
    },
    // client name
    client: {
        type: mongoose.Schema.Types.ObjectId,
        // ref: 'Client' // ### deprecated ###
        ref: 'User' 
    },
    // manager name
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        // ref: 'Employee' // ### deprecated ###
        ref: 'User' 
    },
    brif: String,
    attachment: Array,
    openedAt: Date,
    completedAt: Date,
    quantity: Number,
    budget: Number,
},{ timestamps: true });

const quotationModel = mongoose.model("Quotation", quotationSchema);

module.exports = quotationModel;

/**
 * 
 {
    "brif": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>",
    "quantity": 1,
    "budget": 260
}
*
 **/
