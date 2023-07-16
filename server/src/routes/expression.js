const express = require('express')
const ExpressionController = require('../controllers/expressionController')

const exp = new ExpressionController()
const router = express.Router()

router.post('/', exp.add)
router.delete('/:id', exp.delete)
router.delete('/', exp.deleteAll)
router.get('/', exp.getAll)

module.exports = router
