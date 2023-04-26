import express from 'express'
import session from 'express-session'
import passport from 'passport'
import { Strategy } from 'passport-local'
import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(new Strategy((username, password, done) => {
    const users = JSON.parse(readFileSync(join(__dirname, './users.json')))

    const index = users.findIndex(e => e.username === username)
    if (index === -1) {
        return done(null, false, { "Error": "incorrect credentials" })
    }

    const user = users[index]

    if (user.password !== password) {
        return done(null, false, { "Error": "incorrect credentials" })
    }

    return done(null, user)
}))

app.get('/login', (req, res) => {
    res.sendFile(join(__dirname, './views/login.html'))
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/resource',
    failureRedirect: '/login'
}))

app.get('/resource', (req, res) => {
    if (!req.user) {
        res.redirect('/login')
    }

    res.end(`resource owned by ${req.user.username}`)
})

app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err)
        }

        res.redirect('/login')
    })
})


app.listen(3000)
