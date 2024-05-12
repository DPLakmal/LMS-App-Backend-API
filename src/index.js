import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import router from './routes/routes.js'
import cors from 'cors'

dotenv.config()

const app = express()
const port = process.env.PORT
const mongodb_uri = process.env.MONGODB_URI

app.use(cors())

mongoose
  .connect(mongodb_uri)
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.log(`Error: ${err}`))

app.get('/', (req, res) => {
  const htmlMessage = `
  <head>
      <style>
          body {
              font-family: Arial, sans-serif;
              text-align: center;
          }
          h1 {
              line-height: 200px;
              width: 100%;
          }
      </style>
  </head>
  <body>
      <h1>Welcome LMS - REST API</h1>
      <p>This is a sample HTML message returned by our API route.</p>
  </body>
`

  res.send(htmlMessage)
})

app.use('/api', router)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
