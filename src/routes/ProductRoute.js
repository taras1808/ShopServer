const router = require('express').Router()
const productController = require('../controllers/ProductController')

router.get("/", productController.get)

// router.get("/:product", productController.get)

module.exports = router