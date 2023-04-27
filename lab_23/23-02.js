import express from 'express'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const DB_PATH = join(__dirname, './users.json')

const secret = 'secret'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

function authenticateToken(req, res, next) {
    const authorization = req.headers['authorization']
    if (authorization == null) {
        return res.sendStatus(401)
    }

    jwt.verify(authorization.split(' ')[1], secret, (err, user) => {
        if (err) {
            return res.writeHead(401, 'unauthorized').end('unauthorized')
        }

        req.user = user

        next()
    })
}

app.get('/login', (_req, res) => {
    res.sendFile(join(__dirname, './views/login.html'))
})

app.post('/login', (req, res) => {
    const users = JSON.parse(readFileSync(DB_PATH))

    const index = users.findIndex((e) => e.username === req.body.username)
    if (index === -1) {
        return res
            .writeHead(401, 'incorrect credentials')
            .end('incorrect credentials')
    }

    const user = users[index]

    if (user.password !== req.body.password) {
        return res
            .writeHead(401, 'incorrect credentials')
            .end('incorrect credentials')
    }

    delete user['password']
    const tokens = {
        access: jwt.sign({ username: user.username }, secret, {
            expiresIn: '10m',
        }),
        refresh: jwt.sign({ username: user.username }, secret, {
            expiresIn: '24h',
        }),
    }

    res.cookie('accessToken', tokens.access, {
        httpOnly: true,
        sameSite: true,
    })
    res.cookie('refreshToken', tokens.refresh, {
        httpOnly: true,
        sameSite: true,
    })

    res.json(tokens)
})

app.get('/resource', authenticateToken, (req, res) => {
    res.end(`resource owned by ${req.payload.username}`)
})

app.get('/logout', (req, res, next) => {
    res.clearCookie('tokens')
    res.end()
})

app.post('/reg', (req, res) => {
    const user = req.body
    const users = JSON.parse(readFileSync(DB_PATH))

    const index = users.findIndex((e) => e.username === user.username)
    if (index !== -1) {
        return res.writeHead(401, 'bad credentials').end('bad credentials')
    }

    users.push({ username: user.username, password: user.password })
    writeFileSync(DB_PATH, JSON.stringify(users, null, '\t'))

    // delete user['password']
    const tokens = {
        access: jwt.sign({ username: user.username }, secret, {
            expiresIn: '10m',
        }),
        refresh: jwt.sign({ username: user.username }, secret, {
            expiresIn: '24h',
        }),
    }

    const cookieOptions = { httpOnly: true, sameSite: true }
    res.cookie('accessToken', tokens.access, cookieOptions)
    res.cookie('refreshToken', tokens.refresh, cookieOptions)

    res.json(tokens)
})

app.listen(3000)
