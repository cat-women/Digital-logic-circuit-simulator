const jwt = require('jsonwebtoken')

require('dotenv').config()

function generateToken (data) {
  const access_token = jwt.sign(data, process.env.JWT_ACCESS_TOKEN_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_LIFE
  })

  const refresh_token = jwt.sign(data, process.env.JWT_REFRESH_TOKEN_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_LIFE
  })

  return { access_token, refresh_token }
}

function verifyAccessToken (access_token) {
  let decoded, error

  try {
    decoded = jwt.verify(access_token, process.env.JWT_ACCESS_TOKEN_KEY)
  } catch (err) {
    error = err
  }
  return { decoded, error }
}

function verifyRefreshToken (refresh_token) {
  const decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_TOKEN_KEY)
  return decoded
}

module.exports = { generateToken, verifyAccessToken, verifyRefreshToken }
