const router = require('express').Router()
const searchController = require('../controllers/SearchController')

router.get('/producers', searchController.getProducers)

router.get('/prices', searchController.getPrices)

router.get('/products', searchController.getProducts)

module.exports = router