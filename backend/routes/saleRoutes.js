const express = require('express')
const router = express.Router()

const {createSale, getSales} = require('../controllers/saleController')

//POST REQUEST
router.post('/new', createSale)
router.get('/', getSales)

module.exports = router