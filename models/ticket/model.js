const mongoose = require('mongoose');
const z = require('zod');

// Define Zod schema for ticket data validation
const ticketSchemaZod = z.object({
    subject: z.string()
    .min(8, { message: "subject must be contain at least 8 characters" })
    .max(32, { message: "subject must be contain at most 32 characters" }),
    brif: z.string(),
    order: z.any(),
    client: z.any(),
    manager: z.any(),
    priority: z.enum(["Urgent", "Regular", "Normal"]),
    status: z.enum(["Open", "Hold", "Close"]),
});

const ticketSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    brif: {
        type: String,
        required: true
    },
    // order id
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order' 
    },
    // client name
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
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
},{ 
    timestamps: true,
    collection: 'tickets'
 })

 // Function to validate service data against Zod schema
const validateTicket = (data) => {
    const result = ticketSchemaZod.safeParse(data);
    return {
        success: result.success,
        error: result.success ? null : result.error.message
    };
};

// Middleware to validate service data before saving
ticketSchema.pre('save', function (next) {
    const validation = validateTicket(this.toObject());
    if (!validation.success) {
        const error = new Error(validation.error);
        return next(error);
    }
    next();
});


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