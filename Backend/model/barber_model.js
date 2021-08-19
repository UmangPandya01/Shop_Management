const mongoose = require('mongoose')

const barber = mongoose.Schema({
    name: {
        type: String,
    },
    number: {
        type: Number,
        required: true
    }
})

const Barber = mongoose.model('Barber', barber)

module.exports = Barber