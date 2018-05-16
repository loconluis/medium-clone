// require all the dependencies we gonna need
const express = require('express')
const _routes = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParse = require('body-parser')
const helmet = require('helmet')
const cloudinary = require('cloudinary')
const config = require('./config')
// instance 
const app = express()
// const router = express.Router()
const uri = process.env.MOGODB_URI || 'mongodb://localhost:27017/medium'
let PORT = process.env.PORT || 5500
// cloudinary config
cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.API_KEY,
  api_secret: config.API_SECRET
})
// connection to MONGO
try {
  mongoose.connect(uri)
} catch (e) {
  console.log('Connection with mongo fail check Error:', e)
}
// set up the middlewares
app.use(cors())
app.use(bodyParse.json())
app.use(helmet())
app.use('/api', _routes.articleRoutes)
app.use('/api', _routes.userRoute)
// start server
app.listen(PORT, () => console.log(`Server start on PORT ${PORT}`))
