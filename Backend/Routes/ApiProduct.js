const express = require('express')

const auth = require('../middleware/auth')
const ProductControllerAPI = require('../Controller/ApiProductController')

const router = express.Router()

//! Add product -- Admin
router.post('/addproduct', auth, ProductControllerAPI.addProduct)

router.get('/catproducts', ProductControllerAPI.getProducts)

router.get('/getoneproduct/:id', auth, ProductControllerAPI.getOneProduct)

router.get('/getallproducts', auth, ProductControllerAPI.getAllProducts)

module.exports = router