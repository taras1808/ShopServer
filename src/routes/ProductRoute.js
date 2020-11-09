const router = require('express').Router()
const productController = require('../controllers/ProductController')

router.get("/", productController.get)
router.post("/", productController.post)

router.get("/:productId", productController.getProduct)

module.exports = router