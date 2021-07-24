const router = require('express').Router()
const optionsController = require('../controllers/OptionsController')
const jwtMiddleware = require('../middlewares/JwtMiddleware')
const roleMiddleware = require('../middlewares/RoleMiddleware')

router.get("/", optionsController.getOptions)
router.get("/:optionId/", optionsController.getOption)


router.use(jwtMiddleware.required)
router.use(roleMiddleware.onlyAdmins)

router.post("/", optionsController.create)
router.put("/:optionId/", optionsController.update)
router.delete("/:optionId/", optionsController.delete)

module.exports = router