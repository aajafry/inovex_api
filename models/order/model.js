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
        ref: 'User' 
    },
    // manager name
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    brif: String,
    attachment: String,
    openedAt: Date,
    completedAt: Date,
    quantity: Number,
    budget: Number,
    status: {
        type: String,
        enum: {
            values: ["Ongoing","Process","Completed"],
            message: '{VALUE} is not supported'
        }
    },
    // tickets details
    tickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket' 
    }]
},{ 
    timestamps: true,
    collection: 'orders'
 });


const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;

/**
{
    "brif": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>",
    "quantity": 3,
    "budget": 460,
    "status": "Process"
}
 */
