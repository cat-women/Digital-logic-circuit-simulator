const { ObjectId } = require('mongodb')
const { verifyAccessToken, verifyRefreshToken } = require('../services/token')

const authUser = async (req, res, next) => {
  const access_token = req.headers['authorization']?.replace('Bearer ', '')

  if(!access_token)  
    return res.status(401).json({ msg: 'Authentication failed' })
    
  const { decoded, error } =await verifyAccessToken(access_token)
  if (error) {
    return res.status(401).json({ msg: 'Authentication failed', error })
  }
  
  req.user = decoded
  
  next()
}

module.exports = { authUser }
