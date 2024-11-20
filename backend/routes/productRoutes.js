const express = require('express')
const router = express.Router()

const {
    createProduct,
    getProducts
} = require('../controllers/productController')


//POST REQUEST
router.post('/new', createProduct)

//GET REQUEST
router.get('/all', getProducts)

module.exports = router