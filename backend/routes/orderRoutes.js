const express = require('express')
const router = express.Router()

const {createOrder, getOrders} = require('../controllers/orderController')

//POST REQUEST
router.post('/new', createOrder)

//GET REQUEST
router.get('/', getOrders)

module.exports = router