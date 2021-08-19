const mongoose = require('mongoose')

const servicesSchema = mongoose.Schema({
    serviceType: {
        type: String,
        required: true,
    },
    serviceName: {
        type: String,
        required: true,
    },
    servicePrice: {
        type: Number,
        required: true,
    },
    serviceImageUrl: {
        type: String,
    }
})

const Service = mongoose.model('Service', servicesSchema)


module.exports = Service