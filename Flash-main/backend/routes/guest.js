const express = require('express')
const {getProducts, getProduct} = require('../controllers/ProductsController')
const router=express.Router()


//GET all products (for guest)
router.get('/products',getProducts) 


//GET a single product (for guest)
router.get('/products/:id',getProduct)

module.exports = router;