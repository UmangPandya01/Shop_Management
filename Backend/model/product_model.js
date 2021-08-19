const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productCat: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productImage: {
        type: String,
        required:true,
    },
    productDesc: {
        type: Array,
        required: true,
    },
    productBrand: {
        type: String,
    },
    productRat: {
        type: Number,
        default: 0
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product