const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

const {createSale, getSales, getMonthlySalesByProduct, getDashboardDataByYear} = require('../controllers/saleController')

router.use(requireAuth)

//POST REQUEST
router.post('/new', createSale)
router.get('/', getSales)
router.get('/:year', getMonthlySalesByProduct)
router.get('/dashboard/:year', getDashboardDataByYear)

module.exports = router