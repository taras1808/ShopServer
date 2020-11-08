const router = require('express').Router()
const productController = require('../controllers/ProductController')

router.get("/", productController.get)

router.get("/:productId", productController.getProduct)

module.exports = router