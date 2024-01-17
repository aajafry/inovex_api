const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // service name
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service' 
    },
    // client name
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client' 
    },
    // manager name
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    brif: String,
    attachment: Array,
    openedAt: Date,
    completedAt: Date,
    quantity: Number,
    budget: Number,
    // tickets details
    tickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket' 
    }]
},{ timestamps: true });


const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;

/**
{
    "brif": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>",
    "quantity": 3,
    "budget": 460
}
 */
