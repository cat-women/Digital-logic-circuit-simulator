const express = require('express')
const UserController = require('../controllers/userController')

const user = new UserController()
const router = express.Router()

router.post('/signup', user.signup)

router.post('/signin', user.signin)


module.exports = router
