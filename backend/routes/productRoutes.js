const express = require('express')

const {
    createProduct,
    getProducts,
    getStockByProduct,
    getCurrentDashboardData,
    updateProduct,
    addStock,
    deleteProduct,
} = require('../controllers/productController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)


//POST REQUEST
router.post('/new', createProduct)

//GET REQUEST
router.get('/', getProducts)
router.get('/stocks', getStockByProduct)
router.get('/dashboard', getCurrentDashboardData)

//UPDATE REQUEST
router.patch('/:id', updateProduct)
router.patch('/add/:id', addStock)

//DELETE REQUEST
router.delete('/:id', deleteProduct)

module.exports = router