const Expression = require('../models/expression.js')

class ExpressionController {
  add = async (req, res, next) => {
    const { input, expression } = req.body
    const user = req.user
    try {
      const result = await Expression.create({
        userId: user.id,
        input: JSON.stringify(input),
        expression: JSON.stringify(expression)
      })
      console.log(result)
      return res.status(200).json({ msg: 'expression added' })
    } catch (error) {
      console.log(error)
      next()
    }
  }
  getAll = async (req, res, next) => {
    const userId = req.user.id
    try {
      const exps = await Expression.find({ userId })
      res.status(200).json(exps)
    } catch (error) {
      console.log(error)
      next()
    }
  }
  delete = async (req, res, next) => {
    const { _id } = req.body
    try {
      const exp = await User.findById(_id)
      if (!exp)
        return res.status(404).json({ msg: 'Expression does not exist' })
      await exp.revove()

      res.status(200).json({ msg: 'Expression deleted' })
    } catch (error) {
      console.log(error)
      next()
    }
  }

  deleteAll = async (req, res, next) => {
    const { userId } = req.body
    try {
      const exps = await User.find({ userId })

      if (exps.length === 0) {
        return res.status(404).json({ msg: 'Expressions do not exist' })
      }

      await User.deleteMany({ userId })

      res.status(200).json({ msg: 'Expressions deleted' })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

module.exports = ExpressionController
