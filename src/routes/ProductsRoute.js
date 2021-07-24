const router = require('express').Router()
const productsController = require('../controllers/ProductsController')
const jwtMiddleware = require('../middlewares/JwtMiddleware')
const roleMiddleware = require('../middlewares/RoleMiddleware')

router.get("/", productsController.getProducts)
router.get("/:productId/options", productsController.getOptions)

router.use(jwtMiddleware.optional)

router.get("/:productId", productsController.getProduct)

router.use(jwtMiddleware.required)
router.use(roleMiddleware.onlyAdmins)

router.post("/", productsController.create)
router.put("/:productId", productsController.update)
router.delete("/:productId", productsController.delete)

module.exports = router
