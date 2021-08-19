const express = require('express')

const auth = require('../middleware/auth')
const CartControllerAPI = require('../Controller/ApiCartController')

const router = express.Router()

//! Add product -- Admin
router.post('/addtocart/:id', auth, CartControllerAPI.addToCart)

router.get('/getcartprod', auth, CartControllerAPI.getCartProducts)

router.get('/removefromcart', auth, CartControllerAPI.removeFromCart)

module.exports = router