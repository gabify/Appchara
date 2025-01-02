const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const {
    createOrder, 
    getOrders, 
    completeOrder, 
    cancelOrder, 
    getOrderByUser} = require('../controllers/orderController')

const router = express.Router()
router.use(requireAuth)

//POST REQUEST
router.post('/new', createOrder)

//GET REQUEST
router.get('/', getOrders)
router.get('/user/:userId', getOrderByUser)

//PATCH REQUEST
router.patch('/cancel/:orderId', cancelOrder)
router.patch('/:orderId', completeOrder)

module.exports = router