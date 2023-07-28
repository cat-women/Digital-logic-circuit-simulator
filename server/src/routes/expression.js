const express = require('express')
const ExpressionController = require('../controllers/expressionController')
const { authUser } = require('../middleware/auth')
const exp = new ExpressionController()
const router = express.Router()

router.post('/', authUser, exp.add)
router.delete('/:id', authUser, exp.delete)
router.delete('/all', authUser, exp.deleteAll)
router.get('/', authUser, exp.getAll)

module.exports = router
