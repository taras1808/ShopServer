const router = require('express').Router()
const categoriesController = require('../controllers/CategoriesController')
const jwtMiddleware = require('../middlewares/JwtMiddleware')
const roleMiddleware = require('../middlewares/RoleMiddleware')

router.get("/", categoriesController.getCategories)
router.get("/roots", categoriesController.getRootCategories)
router.get("/:categoryId/", categoriesController.getCategory)
router.get("/:categoryId/roots", categoriesController.getRootsCategories)
router.get("/:categoryId/products", categoriesController.getProducts)
router.get("/:categoryId/fitlers", categoriesController.getFilters)

router.use(jwtMiddleware.required)
router.use(roleMiddleware.onlyAdmins)

router.post("/", categoriesController.create)
router.put("/", categoriesController.updateCategories)
router.put("/:categoryId/", categoriesController.update)
router.delete("/:categoryId/", categoriesController.delete)
router.put("/:categoryId/fitlers", categoriesController.updateFilters)

module.exports = router
