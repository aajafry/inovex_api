const mongoose = require('mongoose');
const z = require('zod');

// Define Zod schema for ticket data validation
const invoiceSchemaZod = z.object({
    client: z.any(), 
    country: z.string()
      .min(3, { message: "country name must be contain at least 4 characters" })
      .max(16, { message: "country name must be contain at most 16 characters" }),
    city: z.string()
    .min(3, { message: "country name must be contain at least 3 characters" })
    .max(16, { message: "country name must be contain at most 16 characters" }),
    state: z.string()
    .min(3, { message: "state name must be contain at least 3 characters" })
    .max(16, { message: "state name must be contain at most 16 characters" }),
    zip: z.number()
      .positive(),
    service: z.any(),
    order: z.any(), 
    payableAmt: z.number().positive(),
    discAmt: z.number().positive(),
    paidAmt: z.number().positive(),
    dueAmt: z.number().positive(),
    totalAmt: z.number().positive(),
    status: z.enum(["Paid", "Unpaid"]),
    note: z.string().optional(),
});


const invoiceSchema = new mongoose.Schema({
    // client name
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    // service name
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service' 
    },
    // order id
    order: {
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

},{ 
    timestamps: true,
    collection: 'invoices'  
})

// Function to validate invoice data
const validateInvoice = (data) => {
    const result = invoiceSchemaZod.safeParse(data);
    return {
        success: result.success,
        error: result.success ? null : result.error.errors[0].message
    };
};


// Middleware to validate service data before saving
invoiceSchema.pre('save', function (next) {
    const validation = validateInvoice(this.toObject());
    if (!validation.success) {
        const error = new Error(validation.error);
        console.log(error);
        return next(error);
    }
    console.log("!ok");
    next();
});
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