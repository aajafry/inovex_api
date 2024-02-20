const mongoose = require('mongoose');
const z = require('zod');

// Define Zod schema for user data validation
const userSchemaZod = z.object({
    name: z.string()
    .min(3, { message: "name must be contain at least 3 characters" })
    .max(16, { message: "name must be contain at most 16 characters" }),
    email: z.string().email({ message: "invalid email address" }),
    password: z.string(),
    country: z.string()
      .min(3, { message: "country name must be contain at least 3 characters" })
      .max(16, { message: "country name must be contain at most 16 characters" }),
    city: z
      .string()
      .min(3, { message: "country name must be contain at least 3 characters" })
      .max(16, { message: "country name must be contain at most 16 characters" }),
    state: z.string()
    .min(3, { message: "state name must be contain at least 3 characters" })
    .max(16, { message: "state name must be contain at most 16 characters" }),
    zip: z.number().min(1000).max(999999),
    role: z.enum(["Super Admin", "Admin", "Moderator", "Client", "User"]),
    image: z.any(),
    orders: z.array(z.string().optional()),
    quotations: z.array(z.string().optional()),
    tickets: z.array(z.string().optional())
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
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
    role: {
        type: String,
        enum: {
            values: ["Super Admin","Admin", "Moderator", "Client", "User"],
            message: '{VALUE} is not supported'
        }
    },
    image: String,
    // orders details
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order' 
    }],
    // quotations details
    quotations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quotation' 
    }],
    // tickets details
    tickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket' 
    }]
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }, 
    timestamps: true,
    collection: 'users' 
})


userSchema.virtual('address').get(function() {
    return this.city + ', ' + this.state + ', ' + this.country + ', ' + this.zip;
});

// Function to validate user data
const validateUser = (data) => {
    const result = userSchemaZod.safeParse(data);
    return {
        success: result.success,
        error: result.success ? null : result.error.errors[0].message
    };
};

// Middleware to validate order data before saving
userSchema.pre('save', function (next) {
    const validation = validateUser(this.toObject());
    if (!validation.success) {
        const error = new Error(validation.error);
        return next(error);
    }
    next();
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;

/**
{
    "name" : "jack",
    "email": "jack@gmail.com",
    "country": "USA",
    "city": "new york",
    "state": "new york",
    "zip": 1234
    "role": "Client"
}
 */
