const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    // prodType: {
    //     type: String,
    //     required: true,
    // },
    // prodName: {
    //     type: String,
    //     required: true,
    // },
    // prodPrice: {
    //     type: Number,
    //     required: true,
    // },
    // prodQuantity: {
    //     type: Number,
    //     required : true,
    // },
    // prodImage: {
    //     type: String,
    //     required: true,
    // },
    products: {
        type: Array,
        default: [],
        required: true,
    },
    clientID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Client'
    },
})

const Cart = mongoose.model('Cart',cartSchema)

module.exports = Cart