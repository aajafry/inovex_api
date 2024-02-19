const mongoose = require('mongoose');
const z = require('zod');

// Define Zod schema for order data validation
const orderSchemaZod = z.object({
    service: z.any(),
    client: z.any(),
    manager: z.any(),
    brif: z.string(),
    attachment: z.any(),
    openedAt: z.date().optional(),
    completedAt: z.date().optional(),
    quantity: z.number().positive(),
    budget: z.number().positive(),
    status: z.enum(["Ongoing", "Process", "Completed"]),
    tickets: z.array(z.string().optional()),
});

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
    brif: {
        type: String,
        required: true
    },
    attachment: {
        type: String,
        required: true
    },
    openedAt: {
        type: Date,
        required: true
    },
    completedAt: {
        type: Date,
        required: true
    },
    quantity: {
        type: Number,
        min: 0,
        required: true
    },
    budget: {
        type: Number,
        min: 0,
        required: true
    },
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

 // Function to validate order data against Zod schema
const validateOrder = (data) => {
    const result = orderSchemaZod.safeParse(data);
    return {
        success: result.success,
        error: result.success ? null : result.error.message
    };
};

// Middleware to validate order data before saving
orderSchema.pre('save', function (next) {
    const validation = validateOrder(this.toObject());
    if (!validation.success) {
        const error = new Error(validation.error);
        return next(error);
    }
    next();
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
