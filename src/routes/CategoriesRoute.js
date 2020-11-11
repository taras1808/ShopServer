const router = require('express').Router()
const categoriesController = require('../controllers/CategoriesController')

router.get("/", categoriesController.getCategories)

router.get("/:categoryId", categoriesController.getCategory)

router.get("/:categoryId/prices", categoriesController.getPrices)

router.get("/:categoryId/products", categoriesController.getProducts)

router.get("/:categoryId/producers", categoriesController.getProducers)

module.exports = router