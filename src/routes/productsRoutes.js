const express = require('express')
const router = express.Router()
const { getProducts } = require('../controller/productsController')

//Get all products
//@route GET /api/products
//@access Public

router.get('/', getProducts)


module.exports = router