const Expression = require('../models/expression.js')
const mongoose = require('mongoose')

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

      return res.status(200).json({ msg: 'expression added', expression: result })
    } catch (error) {
      console.log(error)
      next()
    }
  }
  getAll = async (req, res, next) => {
    const userId = req.user.id
    try {
      if (!userId) {
        return res.status(401).json({ msg: "Not authorized" });
      }
      const exps = await Expression.find({ userId })
      res.status(200).json(exps)
    } catch (error) {
      console.log(error)
      next()
    }
  }
  delete = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id)
      const exp = await Expression.findById(req.params.id)
      if (!exp)
        return res.status(404).json({ msg: 'Expression does not exist' })
      await exp.remove()

      res.status(200).json({ msg: 'Expression deleted', exp })
    } catch (error) {
      console.log(error)
      next()
    }
  }

  clearAll = async (req, res, next) => {
    const userId = req.user.id;

    try {
      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(401).json({ msg: "Not authorized" });
      }

      const exps = await Expression.find({ userId });
      if (!exps.length) {
        return res.status(404).json({ msg: 'Expressions do not exist' });
      }
      await Expression.deleteMany({ userId });

      res.status(200).json({ msg: 'Expressions deleted' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ExpressionController
