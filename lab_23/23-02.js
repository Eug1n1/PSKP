import express from 'express'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { PrismaClient } from '@prisma/client'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import passport from 'passport'

const prisma = new PrismaClient()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const atSecret = 'at_secret'
const rtSecret = 'rt_secret'

const app = express()

app.use(express.urlencoded({ extended: true }))

async function getTokens(payload) {
    const tokens = {
        accessToken: jwt.sign(payload, atSecret, { expiresIn: '30s' }),
        refreshToken: jwt.sign(payload, rtSecret, { expiresIn: '10d' }),
    }

    await prisma.user.update({
        where: {
            username: payload.username,
        },
        data: {
            rt: tokens.refreshToken,
        },
    })

    return tokens
}

function jwtRefreshStrategy(req, res, next) {
    try {
        const token = req.headers['authorization'].split(' ')?.[1]

        if (!token) {
            return res.writeHead(401, 'unauthorized').end('unauthorized')
        }

        const user = jwt.verify(token, rtSecret)
        req.user = { ...user, token }

        next()
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            return res.writeHead(401, 'invalid_token').end('invalid token')
        }

        return res.writeHead(401).end()
    }
}

function jwtStrategy(req, res, next) {
    try {
        const token = req.headers['authorization'].split(' ')?.[1]

        if (!token) {
            return res.writeHead(401, 'unauthorized').end('unauthorized')
        }

        const user = jwt.verify(token, atSecret)
        req.user = user

        next()
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            return res.writeHead(401, 'invalid_token').end('invalid token')
        }

        res.writeHead(401)
    }
}

app.get('/login', function (_, res) {
    res.sendFile(join(__dirname, './views/login.html'))
})

app.post('/login', async function (req, res) {
    const user = await prisma.user.findFirst({
        where: {
            username: req.body.username,
            password: req.body.password,
        },
        select: {
            username: true,
        },
    })

    if (!user) {
        return res.writeHead(401, 'bad_credentials').end('bad credentials')
    }

    const tokens = await getTokens(user)
    res.json(tokens)
})

app.post('/reg', async function (req, res) {
    let user = await prisma.user.findFirst({
        where: {
            username: req.body.username,
        },
    })

    if (user) {
        return res.writeHead(409).end()
    }

    user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: req.body.password,
        },
        select: {
            username: true,
        },
    })

    const tokens = await getTokens(user)
    res.status(201).json(tokens)
})

app.post('/refresh', jwtRefreshStrategy, async function (req, res) {
    const user = await prisma.user.findFirst({
        where: {
            username: req.user.username,
            rt: req.user.token,
        },
        select: {
            username: true,
        },
    })

    if (!user) {
        return res.writeHead(401, 'invalid_token').end('invalid token')
    }

    const tokens = await getTokens(user)
    res.json(tokens)
})

app.post('/logout', jwtStrategy, async function (req, res) {
    await prisma.user.updateMany({
        where: {
            username: req.user.username,
            rt: {
                not: null,
            },
        },
        data: {
            rt: null,
        },
    })

    res.end('logout')
})

app.get('/resource', jwtStrategy, function (req, res) {
    res.end(`resource owned by ${req.user.username}`)
})

app.listen(3000)
