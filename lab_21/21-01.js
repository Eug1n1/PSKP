import express from 'express'
import { readFileSync, writeFileSync } from 'fs'
import { nanoid } from 'nanoid'
import { engine } from 'express-handlebars'
import bodyParser from 'body-parser'

const DB_FILE_PATH = './contacts.json'

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static'))

app.engine('.html', engine({ extname: '.html' }));
app.set('view engine', '.html');
app.set('views', './views');

app.get('/', (req, res) => {
    const contacts = JSON.parse(readFileSync(DB_FILE_PATH))
    res.render('index', { contacts })
})

app.get('/add', (req, res) => {
    const contacts = JSON.parse(readFileSync(DB_FILE_PATH))
    res.render('add', { data: { contacts } })
})

app.get('/update', (req, res) => {
    const contact = req.query
    const contacts = JSON.parse(readFileSync(DB_FILE_PATH))

    res.render('update', { data: { contact, contacts } })
})

app.post('/add', (req, res) => {
    try {
        const contact = req.body

        if (!contact) {
            throw { "Error": "no data" }
        }

        const contacts = JSON.parse(readFileSync(DB_FILE_PATH))

        contact.id = nanoid()
        contacts.push(contact)

        writeFileSync(DB_FILE_PATH, JSON.stringify(contacts, null, '\t'))

        // res.json(contacts) // TODO: redirect
        // res.render('index', { data: { contacts, contact } })
        res.redirect('/')
    } catch (e) {
        console.log(e)
        res.json(e)
    }
})

app.post('/update/:id', (req, res) => {
    try {
        const id = req.params.id
        const contact = req.body

        if (!contact) {
            throw { "Error": "no data" }
        }

        const contacts = JSON.parse(readFileSync(DB_FILE_PATH))
        const index = contacts.findIndex(e => e.id === id)

        if (index === -1) {
            throw { "Error": "element not found" }
        }

        contact.id = id

        contacts[index] = contact

        writeFileSync(DB_FILE_PATH, JSON.stringify(contacts, null, '\t'))

        res.redirect('/')
    } catch (e) {
        console.log(e)
        res.json(e)
    }
})

app.post('/delete/:id', (req, res) => {
    try {
        const id = req.params.id

        // if (!id) {
        //     throw { "Error": "no id" }
        // }

        const contacts = JSON.parse(readFileSync(DB_FILE_PATH))
        const index = contacts.findIndex(e => e.id === id)

        if (index === -1) {
            throw { "Error": "element not found" }
        }

        let element = contacts[index]
        contacts.splice(index, 1)

        writeFileSync(DB_FILE_PATH, JSON.stringify(contacts, null, '\t'))

        res.redirect('/')
    } catch (e) {
        console.log(e)
        res.json(e)
    }
})


app.listen(3000)
