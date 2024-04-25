import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import morgan from 'morgan'

dotenv.config()

const app = express()

//Middleware
app.use(express.json())
app.use(morgan('combined'))
app.use(helmet())

//Connect to mongoDB
;(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '')
    console.log('Connected to database successfully')
  } catch (error) {
    console.error('Error connecting to database:', error)
  }
})()

import router from './routes/routes.js'

app.use('/api', router)

const PORT = parseInt(process.env.PORT || '3000')
app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
)

export default app
