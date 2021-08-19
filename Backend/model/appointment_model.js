const mongoose = require('mongoose')


const appointmentSchema = ({
    serviceType: {
        type: String,
        required: true,
    },
    clientID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Client'
    },
    serviceName: {
        type: String,
        requred: true,
    },
    barberID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Barber'
    },
    time: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    slote: {
        type: Number,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    isEmpty: {
        type: Boolean,
        default: true
    },
})

const Appointment = mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment