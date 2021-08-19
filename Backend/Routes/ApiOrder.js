const express = require('express')

const auth = require('../middleware/auth')
const OrderControllerAPI = require('../controller/ApiOrderController')
const router = express.Router()

router.post('/placeorder/:id', auth, OrderControllerAPI.placeOrder)

router.get('/getallorders', auth, OrderControllerAPI.getOrders)
module.exports = router