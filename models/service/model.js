const mongoose = require('mongoose');
const z = require('zod');

// Define Zod schema for service data validation
const serviceSchemaZod = z.object({
    name: z.string()
    .min(8, { message: "service name must be contain at least 8 characters" })
    .max(32, { message: "service name must be contain at most 32 characters" }),
    brif: z.string(),
    attachment: z.any(),
    duration: z.string(),
    paymentTerm: z.enum(["Pay with Invoice", "Pay with Instalment"]),
    price: z.number().positive(),
    invoices: z.array(z.string())
});

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brif: {
        type: String,
        required: true
    },
    attachment: {
        type: String,
    },
    duration: {
        type: String,
        required: true
    },
    paymentTerm: {
        type: String,
        enum: {
            values: ["Pay with Invoice", "Pay with Instalment"],
            message: '${VALUE} is not supported'
        },
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },// Invoice details
    invoices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice' 
    }]
}, { 
    timestamps: true,
    collection: 'services'
 })

 // Function to validate service data against Zod schema
const validateService = (data) => {
    const result = serviceSchemaZod.safeParse(data);
    return {
        success: result.success,
        error: result.success ? null : result.error.message
    };
};

// Middleware to validate service data before saving
serviceSchema.pre('save', function (next) {
    const validation = validateService(this.toObject());
    if (!validation.success) {
        const error = new Error(validation.error);
        return next(error);
    }
    next();
});


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