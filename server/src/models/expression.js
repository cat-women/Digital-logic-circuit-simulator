const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const expSchema = mongoose.Schema(
  {
    userId: ObjectId,
    input: String,
    expression: String
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
)

module.exports = mongoose.model('expression', expSchema)
