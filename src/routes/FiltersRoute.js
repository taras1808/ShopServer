const router = require('express').Router()
const filtersController = require('../controllers/FiltersController')

router.get("/", filtersController.getFilters)
router.post("/", filtersController.create)


router.get("/:filterId/", filtersController.getFilter)
router.put("/:filterId/", filtersController.update)

router.delete("/:filterId/", filtersController.delete)

router.get("/:filterId/options", filtersController.getOptions)

module.exports = router