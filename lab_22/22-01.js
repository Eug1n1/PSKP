import express from 'express'
import session from 'express-session'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import passport from 'passport'
import { BasicStrategy } from 'passport-http'
import { readFileSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

passport.use(new BasicStrategy(
    function(username, password, cb) {
        const users = JSON.parse(readFileSync(join(__dirname, './users.json')))

        const index = users.findIndex(e => e.username === username)
        if (index === -1) {
            return cb(null, false, { "Error": "incorrect credentials" })
        }

        const user = users[index]

        if (user.password === password) {
            return cb(null, true)
        }

        return cb(null, false, { "Error": "incorrect credentials" })
    })
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

const app = express()

app.use(express.static('./static'))
app.use(express.urlencoded({ extended: true }))

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'secret'
}))

app.use(passport.initialize())
app.use(passport.session())

// app.use('*', (req, res, next) => {
//     console.log({
//         response: {
//             statusCode: res.statusCode,
//             headers: res.getHeaders(),
//         },
//         request: {
//             path: req.path,
//             headers: req.headers,
//         }
//     })

//     next()
// })

app.get('/login', (req, res, next) => {
    console.log('preAuth')
    if (req.session.logout && req.headers['authorization']) {
        req.session.logout = false
        delete req.headers['authorization']
    }
    next()
},
    passport.authenticate('basic', { session: false })
)

app.get('/login', (req, res, next) => {
    if (req.headers['authorization']) {
        res.send('success login')
    } else {
        res.redirect('/login')
    }
})

app.get('/logout', (req, res) => {
    req.session.logout = true
    res.redirect('/login')
})

app.get('/resource', passport.authenticate('basic', { session: false }), (req, res) => {
    res.sendFile(join(__dirname, './views/resource.html'))
})


app.listen(3000)
