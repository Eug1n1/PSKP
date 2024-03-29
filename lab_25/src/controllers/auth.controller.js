import jwt from 'jsonwebtoken'
import prisma from '../db.js'

class authContorller {
    async login(req, res) {
        const user = await prisma.user.findFirst({
            where: {
                username: req.body.username,
                password: req.body.password,
            },
            select: {
                id: true,
                username: true,
                role: true,
            },
        })

        if (!user) {
            return res.writeHead(401, 'bad_credentials').end('bad credentials')
        }

        const tokens = await this.getTokens(user)

        res.cookie('accessToken', tokens.accessToken)
        res.cookie('refreshToken', tokens.refreshToken)

        res.json(tokens)
    }

    async register(req, res) {
        let user = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: req.body.username },
                    { username: req.body.email },
                ],
            },
        })

        if (user) {
            return res.status(409).json({ code: 409, message: 'conflict' })
        }

        user = await prisma.user.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            },
            select: {
                id: true,
                username: true,
                role: true,
            },
        })

        const tokens = await this.getTokens(user)
        res.cookie('accessToken', tokens.accessToken)
        res.cookie('refreshToken', tokens.refreshToken)

        res.status(201).json(tokens)
    }

    getAbilities(req, res) {
        res.json({ role: req.user['role'] })
    }

    async refresh(req, res) {
        const token = req.cookies['refreshToken']

        const payload = jwt.decode(token)

        const user = await prisma.user.findFirst({
            where: {
                username: payload['username'],
                rt: token,
            },
            select: {
                id: true,
                username: true,
                role: true,
            },
        })

        if (!user) {
            return res.writeHead(401, 'invalid_token').end('invalid token')
        }

        const tokens = await this.getTokens(user)
        res.cookie('accessToken', tokens.accessToken)
        res.cookie('refreshToken', tokens.refreshToken)

        res.json(tokens)
    }

    async logout(req, res) {
        await prisma.user.updateMany({
            where: {
                id: req.user['id'],
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

        return res.json({ message: 'logout' })
    }

    async getTokens(payload) {
        const tokens = {
            accessToken: jwt.sign(payload, process.env['AT_SECRET'], {
                expiresIn: '30s',
            }),
            refreshToken: jwt.sign(payload, process.env['RT_SECRET'], {
                expiresIn: '10d',
            }),
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
}

export const controller = new authContorller()
