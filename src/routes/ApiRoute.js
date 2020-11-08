const router = require('express').Router();
const categoryRoute = require('./CategoryRoute')
const productRoute = require('./ProductRoute')

router.use('/category', categoryRoute)
router.use('/product', productRoute)

module.exports = router
