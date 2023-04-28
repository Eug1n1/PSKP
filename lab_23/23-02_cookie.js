import express from 'express'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { PrismaClient } from '@prisma/client'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const prisma = new PrismaClient()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const atSecret = 'at_secret'
const rtSecret = 'rt_secret'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

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
        const token = req.cookies['refreshToken']

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

        return res.writeHead(401).end('unauthorized')
    }
}

function jwtStrategy(req, res, next) {
    try {
        const token = req.cookies['accessToken']

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

        return res.writeHead(401).end('unauthorized')
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

    res.cookie('accessToken', tokens.accessToken)
    res.cookie('refreshToken', tokens.refreshToken)

    res.end('logged')
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
    res.cookie('accessToken', tokens.accessToken)
    res.cookie('refreshToken', tokens.refreshToken)

    res.status(200).end('registred')
})

app.post('/refresh', jwtRefreshStrategy, async function (req, res) {
    const user = await prisma.user.findFirst({
        where: {
            username: req.user.username,
            rt: req.cookies['refreshToken'],
        },
        select: {
            username: true,
        },
    })

    if (!user) {
        return res.writeHead(401, 'invalid_token').end('invalid token')
    }

    const tokens = await getTokens(user)
    res.cookie('accessToken', tokens.accessToken)
    res.cookie('refreshToken', tokens.refreshToken)

    res.end('refreshed')
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

    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')

    res.end('logout')
})

app.get('/resource', jwtStrategy, function (req, res) {
    res.end(`resource owned by ${req.user.username}`)
})

app.listen(3000)
