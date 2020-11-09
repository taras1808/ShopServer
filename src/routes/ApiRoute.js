const router = require('express').Router();
const categoryRoute = require('./CategoryRoute')
const productRoute = require('./ProductRoute')
const producentRoute = require('./ProducentRoute')

router.use('/category', categoryRoute)
router.use('/product', productRoute)
router.use('/producent', producentRoute)

module.exports = router
