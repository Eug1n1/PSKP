const express = require('express')
const { engine } = require('express-handlebars')

const app = express()

app.use(express.json())
app.use(express.static('static'))

app.engine('.html', engine({ extname: '.html' }));
app.set('view engine', '.html');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index', { title: 'fasdf' })
})

app.get('/add', (req, res) => {
    res.render('index', { contacts: require('./contacts.json') })
})

app.get('/update', (req, res) => {
    res.render('update', { title: 'fasdf' })
})

app.post('/add', (req, res) => {
    res.render('index', { title: 'fasdf' })
})

app.post('/update', (req, res) => {
    res.render('index', { title: 'fasdf' })
})

app.post('/delete', (req, res) => {
    res.render('index', { title: 'fasdf' })
})


app.listen(3000)
