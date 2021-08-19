const express = require('express')
const APIBarberController = require('../Controller/ApiBarberController')

const router = express.Router()

router.post('/addbarber', APIBarberController.addbarber)

module.exports = router