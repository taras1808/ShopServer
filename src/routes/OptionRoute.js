const router = require('express').Router()
const optionsController = require('../controllers/OptionsController')

router.get("/", optionsController.getOptions)
router.post("/", optionsController.create)

router.put("/:optionId/", optionsController.update)
router.delete("/:optionId/", optionsController.delete)

module.exports = router