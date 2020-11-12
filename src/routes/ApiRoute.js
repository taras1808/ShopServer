const router = require('express').Router();
const categoriesRoute = require('./CategoriesRoute')
const productsRoute = require('./ProductsRoute')
const producersRoute = require('./ProducersRoute')

router.use('/categories', categoriesRoute)
router.use('/products', productsRoute)
router.use('/producers', producersRoute)

module.exports = router
