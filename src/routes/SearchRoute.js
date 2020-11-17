const router = require('express').Router()
const searchController = require('../controllers/SearchController')

router.get('/products', searchController.getProducts)

module.exports = router