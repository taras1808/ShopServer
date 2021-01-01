const router = require('express').Router()
const productsController = require('../controllers/ProductsController')
const jwt = require('../middlewares/JwtMiddleware')

router.get("/", productsController.getProducts)
router.post("/", productsController.create)

router.use(jwt.jwt)
router.get("/:productId", productsController.getProduct)
router.put("/:productId", productsController.update)
router.delete("/:productId", productsController.delete)

router.get("/:productId/options", productsController.getOptions)

module.exports = router