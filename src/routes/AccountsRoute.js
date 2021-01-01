const router = require('express').Router()
const accountsController = require('../controllers/AccountsController')

router.post('/login', accountsController.login)

router.get('/:userId/favourite', accountsController.getFavourite)
router.post('/:userId/favourite', accountsController.addFavourite)
router.delete('/:userId/favourite', accountsController.removeFavourite)

module.exports = router