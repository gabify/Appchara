const express = require('express')
const router = express.Router()

const {createSale, getSales, getMonthlySalesByProduct} = require('../controllers/saleController')

//POST REQUEST
router.post('/new', createSale)
router.get('/', getSales)
router.get('/:year', getMonthlySalesByProduct)

module.exports = router