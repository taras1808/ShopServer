const router = require('express').Router()
const categoriesController = require('../controllers/CategoriesController')

router.get("/", categoriesController.getCategories)

router.get("/:categoryId", categoriesController.getCategory)

router.get("/:categoryId/products", categoriesController.getProducts)

router.get("/:categoryId/fitlers", categoriesController.getFilters)

module.exports = router