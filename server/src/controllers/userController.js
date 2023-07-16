const User = require('../models/user.js')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../services/token')

class UserController {
  signup = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body

    try {
      const oldUser = await User.findOne({
        email
      })

      if (oldUser) return res.status(400).json({ msg: 'User already exits' })

      const hashedPassword = await bcrypt.hash(password, 12)

      await User.create({
        firstName,
        lastName,
        username: firstName,
        email,
        password: hashedPassword
      })

      return res.status(200).json({ msg: 'User created' })
    } catch (error) {
      console.log(error)
      next()
    }
  }

  signin = async (req, res, next) => {
    const { email, password } = req.body
    try {
      const oldUser = await User.findOne({
        email
      })
      if (!oldUser) return res.status(404).json({ msg: 'User does not exit ' })

      const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)
      if (!isPasswordCorrect)
        return res.status(400).json({ msg: 'Invalid crendential' })

      const { access_token, refresh_token } = generateToken({
        username: oldUser.username,
        email: oldUser.email,
        id: oldUser._id
      })

      return res.status(200).json({
        msg: 'Login success',
        data: {
          access_token,
          refresh_token,
          id: oldUser._id,
          username: oldUser.username
        }
      })
    } catch (error) {
      console.log(error)
      next()
    }
  }
}

module.exports = UserController
