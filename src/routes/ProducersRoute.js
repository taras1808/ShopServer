const router = require('express').Router()
const producersController = require('../controllers/ProducersController')

router.post("/", producersController.create)

module.exports = router