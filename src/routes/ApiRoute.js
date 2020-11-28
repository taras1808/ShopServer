const router = require('express').Router();
const categoriesRoute = require('./CategoriesRoute')
const productsRoute = require('./ProductsRoute')
const searchRoute = require('./SearchRoute')
const filtersRoute = require('./FiltersRoute')
const optionsRoute = require('./OptionRoute')

router.use('/categories', categoriesRoute)
router.use('/products', productsRoute)
router.use('/search', searchRoute)
router.use('/filters', filtersRoute)
router.use('/options', optionsRoute)

module.exports = router
