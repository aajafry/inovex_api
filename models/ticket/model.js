const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    subject: String,
    brif: String,
    // order id
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order' 
    },
    // client name
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client' 
    },
    // manager  name
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    priority: {
        type: String,
        enum: {
            values: ["Urgent","Regular","Normal"],
            message: '{VALUE} is not supported'
        }
    },
    status: {
        type: String,
        enum: {
            values: ["Open","Hold","Close"],
            message: '{VALUE} is not supported'
        }
    }
})

const ticketModel = mongoose.model("Ticket", ticketSchema);

module.exports = ticketModel;

/**
{
    "subject" : "correction the content",
    "brif": "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>",
    "priority": "Urgent",
    "status": "Open"
}
 */