const express = require('express')
const hbs = require('hbs');

const mainRouter = require('./routes/index')

const app = express()

app.use(express.static('static'))
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);


app.use('/', mainRouter)

app.listen(3000)
