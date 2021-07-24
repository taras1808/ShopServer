const router = require('express').Router()
const accountsController = require('../controllers/AccountsController')
const jwtMiddleware = require('../middlewares/JwtMiddleware')

router.post('/register', accountsController.register)
router.post('/authenticate', accountsController.authenticate)

router.use('/favourite', jwtMiddleware.required)

router.get('/favourite', accountsController.getFavourite)
router.post('/favourite', accountsController.addFavourite)
router.delete('/favourite', accountsController.removeFavourite)

module.exports = router