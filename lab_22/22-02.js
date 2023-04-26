import express from 'express'
import passport from 'passport'
import session from 'express-session'
import { DigestStrategy } from 'passport-http'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
import { readFileSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(new DigestStrategy({ gop: 'auth' }, (username, done) => {
    const users = JSON.parse(readFileSync(join(__dirname, './users.json')))

    const index = users.findIndex(e => e.username === username)
    if (index === -1) {
        return done(null, false, { "Error": "incorrect credentials" })
    }

    const user = users[index]

    return done(null, user, user.password)
}, (_params, done) => {
    done(null, true)
}))

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/login', (req, _res, next) => {
    if (req.session.logout && req.headers['authorization']) {
        req.session.logout = false
        delete req.headers['authorization']
    }

    next()
})

app.get('/login', passport.authenticate('digest'), (_req, res) => {
    res.send('success login')
})

app.get('/resource', passport.authenticate('digest'), (_req, res) => {
    res.send('resource')
})

app.get('/logout', (req, res) => {
    req.session.logout = true
    res.redirect('/login')
})


app.listen(3000)
