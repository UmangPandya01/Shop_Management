const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    clientID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    orders: {
        type: Array,
        default: [],
        required: true,
    }
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order