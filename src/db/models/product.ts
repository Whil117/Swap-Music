import mongoose from 'mongoose'

const { Schema } = mongoose

mongoose.Promise = global.Promise

export const ProductsSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  productionCapacity: {
    type: Number,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  createAt: {
    type: Date,
    defalut: Date.now(),
  },
})

ProductsSchema.index({ name: 'text' })

module.exports =
  mongoose.models.Product || mongoose.model('Product', ProductsSchema)
