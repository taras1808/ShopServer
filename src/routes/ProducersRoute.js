const router = require('express').Router()
const producersController = require('../controllers/ProducersController')

router.get("/", producersController.get)
router.post("/", producersController.create)

router.get("/:producerId/categories", producersController.getCategories)

router.get("/:producerId", producersController.getProducer)
router.put("/:producerId", producersController.update)
router.delete("/:producerId", producersController.delete)

module.exports = router