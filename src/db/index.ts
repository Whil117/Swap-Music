/* eslint-disable no-console */
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

mongoose.connect(process.env.MONGODB_URI as string, async (err) => {
  if (err) throw err
  console.log('conncted to db')
})

const connection = mongoose.connection

connection.once('open', () => console.log('connected to mongodb'))

connection.on('warning', (e: any) => console.warn(e.stack))
