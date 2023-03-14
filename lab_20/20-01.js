const express = require('express')
const hbs = require('hbs');

const mainRouter = require('./routes/index')

const app = express()

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.use(express.json())

app.use('/api', mainRouter)

app.listen(3000)
