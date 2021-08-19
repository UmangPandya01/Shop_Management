const mongoose = require("mongoose");
const validate = require("validator")

const clientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 4,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 9,
        validator(email) {
            if (!validate.isEmail(email)) {
                throw new Error('Please enter a valid email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        validator(pass) {
            if (pass.length <= 4) {
                throw new Error("Password must cointain min 5 character");
            }
            if (pass.toLowercase().includes('password')) {
                throw new Error("Please set a strong password");
            }
        }
    },
    // tokens: [{
    //     token: {
    //         type: String,
    //     }
    // }]
})

clientSchema.virtual('appointments', //* path for populate
{
    ref: 'Appointment', // * Collection name 
    localField: '_id',
    foreignField: 'clientID' //* key name of Appointment collection
})

clientSchema.virtual('cartProducts', {
    ref: 'Cart',
    localField: '_id',
    foreignField:  'clientID',
})

clientSchema.virtual('orderProducts', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'clientID',
})

const Client = mongoose.model('Client', clientSchema)

module.exports = Client