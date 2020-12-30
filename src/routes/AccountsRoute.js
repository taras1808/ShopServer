const router = require('express').Router()
const accountsController = require('../controllers/AccountsController')

router.post('/login', accountsController.login)

module.exports = router