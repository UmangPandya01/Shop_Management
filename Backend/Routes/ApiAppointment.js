const express = require("express")
const auth = require('../middleware/auth')

const ApiAppointmentController = require('../Controller/ApiAppointmentController')
const router = express.Router()

router.post('/addappointment', auth, ApiAppointmentController.addAppointment)

router.get('/getall',auth , ApiAppointmentController.getAllAppointment)

router.delete('/appointment/:id', auth, ApiAppointmentController.deleteByID)

router.get('/emptyslotes', auth, ApiAppointmentController.emptyslotes)

module.exports = router