const express = require('express')
const ApiServiceController = require('../Controller/ApiServiceController')

const router = express.Router()

router.post('/createService', ApiServiceController.createService)

module.exports = router