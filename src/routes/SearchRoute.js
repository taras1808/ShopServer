const router = require('express').Router()
const searchController = require('../controllers/SearchController')

router.get('/products', searchController.getProducts)
router.get('/filters', searchController.getFilters)

module.exports = router