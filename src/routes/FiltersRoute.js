const router = require('express').Router()
const filtersController = require('../controllers/FiltersController')

router.get("/", filtersController.getFilters)

router.get("/:filterId/options", filtersController.getOptions)

module.exports = router