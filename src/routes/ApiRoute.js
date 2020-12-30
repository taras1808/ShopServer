const router = require('express').Router();
const categoriesRoute = require('./CategoriesRoute')
const productsRoute = require('./ProductsRoute')
const searchRoute = require('./SearchRoute')
const filtersRoute = require('./FiltersRoute')
const optionsRoute = require('./OptionsRoute')
const accountsRoute = require('./AccountsRoute')

router.use('/categories', categoriesRoute)
router.use('/products', productsRoute)
router.use('/search', searchRoute)
router.use('/filters', filtersRoute)
router.use('/options', optionsRoute)
router.use('/accounts', accountsRoute)

module.exports = router
