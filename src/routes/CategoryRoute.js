const router = require('express').Router()
const categoryController = require('../controllers/CategoryController')

router.get("/", categoryController.get)

router.get("/:category/products", categoryController.getProducts)

module.exports = router