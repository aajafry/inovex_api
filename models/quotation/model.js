const mongoose = require('mongoose');
const z = require('zod');

// Define Zod schema for quotation data validation
const quotationSchemaZod = z.object({
    service: z.any(),
    client: z.any(),
    manager: z.any(),
    brif: z.string(),
    attachment: z.any(),
    openedAt: z.date().optional(),
    completedAt: z.date().optional(),
    quantity: z.number().positive(),
    budget: z.number().positive(),
});

const quotationSchema = new mongoose.Schema({
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
        required: true,
    },
    budget: {
        type: Number,
        min: 0,
        required: true,
    },
},{ 
    timestamps: true,
    collection: 'quotations'
 });

 // Function to validate quotation data against Zod schema
const validateQuotation = (data) => {
    const result = quotationSchemaZod.safeParse(data);
    return {
        success: result.success,
        error: result.success ? null : result.error.message
    };
};

// Middleware to validate quotation data before saving
quotationSchema.pre('save', function (next) {
    const validation = validateQuotation(this.toObject());
    if (!validation.success) {
        const error = new Error(validation.error);
        console.log(error);
        return next(error);
    }
    next();
});

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
