const router = require('express').Router()
const searchController = require('../controllers/SearchController')

router.get('/producers', searchController.getProducers)

router.get('/products', searchController.getProducts)

module.exports = router