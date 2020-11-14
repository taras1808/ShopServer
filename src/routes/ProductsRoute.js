const router = require('express').Router()
const productsController = require('../controllers/ProductsController')

router.get("/", productsController.getProducts)
router.post("/", productsController.create)

router.get("/:productId", productsController.getProduct)
router.put("/:productId", productsController.update)
router.delete("/:productId", productsController.delete)

module.exports = router