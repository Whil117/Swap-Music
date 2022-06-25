/* eslint-disable no-console */
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()
//process.env.MONGODB_URI

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string).then(() => {
      console.log('MongoDB connected')
    })
  } catch (error) {
    process.exit(1)
  }
}
export default connection
