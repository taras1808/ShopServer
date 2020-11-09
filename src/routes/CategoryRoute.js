const router = require('express').Router()
const categoryController = require('../controllers/CategoryController')

router.get("/", categoryController.get)

router.get("/:categoryId", categoryController.getCategory)

router.get("/:categoryId/products", categoryController.getProducts)

router.get("/:categoryId/producents", categoryController.getProducents)

module.exports = router