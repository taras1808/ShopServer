const router = require('express').Router()
const producersController = require('../controllers/ProducersController')

router.get("/", producersController.getProducer)
router.post("/", producersController.create)

router.get("/:producerId/categories", producersController.getCategories)

router.put("/:producerId", producersController.update)

module.exports = router