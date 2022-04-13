const { Router } = require('express')
const { login, validarJWT } = require('../controllers/auth')
const router = Router()
// base api/auth/
router.post('/', login)
router.post('/validate', validarJWT)

module.exports = router
