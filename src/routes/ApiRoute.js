const router = require('express').Router();
const categoriesRoute = require('./CategoriesRoute')
const productsRoute = require('./ProductsRoute')
const searchRoute = require('./SearchRoute')

router.use('/categories', categoriesRoute)
router.use('/products', productsRoute)
router.use('/search', searchRoute)

module.exports = router
