const express = require('express')
const router = express.Router()

const {
    createProduct,
    getProducts,
    updateProduct,
    addStock,
    deleteProduct,
} = require('../controllers/productController')


//POST REQUEST
router.post('/new', createProduct)

//GET REQUEST
router.get('/', getProducts)

//UPDATE REQUEST
router.patch('/:id', updateProduct)
router.patch('/add/:id', addStock)

//DELETE REQUEST
router.delete('/:id', deleteProduct)

module.exports = router