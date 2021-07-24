const router = require('express').Router()
const filtersController = require('../controllers/FiltersController')
const jwtMiddleware = require('../middlewares/JwtMiddleware')
const roleMiddleware = require('../middlewares/RoleMiddleware')

router.get("/", filtersController.getFilters)
router.get("/:filterId/", filtersController.getFilter)
router.get("/:filterId/options", filtersController.getOptions)

router.use(jwtMiddleware.required)
router.use(roleMiddleware.onlyAdmins)

router.post("/", filtersController.create)
router.put("/:filterId/", filtersController.update)
router.delete("/:filterId/", filtersController.delete)

module.exports = router
