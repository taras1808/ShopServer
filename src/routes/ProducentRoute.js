const router = require('express').Router()
const producentController = require('../controllers/ProducentController')

router.post("/", producentController.post)

module.exports = router