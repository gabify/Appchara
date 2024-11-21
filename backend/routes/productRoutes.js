const express = require('express')
const router = express.Router()

const {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController')


//POST REQUEST
router.post('/new', createProduct)

//GET REQUEST
router.get('/', getProducts)

//UPDATE REQUEST
router.patch('/:id', updateProduct)

//DELETE REQUEST
router.delete('/:id', deleteProduct)

module.exports = router