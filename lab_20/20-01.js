const express = require('express')
const hbs = require('hbs')

const mainRouter = require('./routes/index')

const app = express()

app.set('view engine', 'hbs')

app.use(express.json())

app.use('/api', mainRouter)

app.listen(3000)
