const router = require('express').Router()
const categoriesController = require('../controllers/CategoriesController')

router.get("/", categoriesController.getCategories)
router.post("/", categoriesController.create)
router.put("/", categoriesController.updateCategories)

router.get("/roots", categoriesController.getRootCategories)

router.get("/:categoryId/", categoriesController.getCategory)
router.put("/:categoryId/", categoriesController.update)
router.delete("/:categoryId/", categoriesController.delete)

router.get("/:categoryId/roots", categoriesController.getRootsCategories)

router.get("/:categoryId/products", categoriesController.getProducts)

router.get("/:categoryId/fitlers", categoriesController.getFilters)

module.exports = router