const express = require('express')
const router = express.Router()

const {createOrder, getOrders, completeOrder, cancelOrder, getOrderByUser} = require('../controllers/orderController')

//POST REQUEST
router.post('/new', createOrder)

//GET REQUEST
router.get('/', getOrders)
router.get('/user/:userId', getOrderByUser)

//PATCH REQUEST
router.patch('/cancel/:orderId', cancelOrder)
router.patch('/:orderId', completeOrder)

module.exports = router