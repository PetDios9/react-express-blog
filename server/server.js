const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(bodyParser.json({ limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true}))

//cors        
app.use(cors())

//conncecting to mongoDB
const dbURI = process.env.ATLUS_URI
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(8000, console.log('connected to mongodb')))
    .catch (err => console.log(err))

//routes
const blogRoutes = require('./routes/api/blogRoutes')
app.use('/blogs', blogRoutes) 

const userRoutes = require('./routes/api/userRoutes')
app.use('/users', userRoutes)
