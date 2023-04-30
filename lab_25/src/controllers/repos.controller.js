import prisma from '../db.js'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library.js'

class reposContorller {
    async findAll(_, res) {
        const repos = await prisma.repo.findMany()

        res.json(repos)
    }

    async findOne(req, res) {
        try {
            const repo = await prisma.repo.findUnique({
                where: {
                    id: Number(req.params['id']),
                },
            })

            if (!repo) {
                return res.status(404).json({ code: 404, message: 'not found' })
            }

            res.json(repo)
        } catch (e) {
            console.log(e)
            if (e instanceof PrismaClientKnownRequestError) {
                return res.status(409).json({ code: 409, message: 'conflict' })
            }

            return res.status(400).json({ code: 400, message: 'bad request' })
        }
    }

    async create(req, res) {
        try {
            const repo = await prisma.repo.create({
                data: {
                    name: req.body['name'],
                    user: {
                        connect: {
                            id: Number(req.user['id']),
                        },
                    },
                },
            })

            res.json(repo)
        } catch (e) {
            console.log(e)
            if (e instanceof PrismaClientKnownRequestError) {
                return res.status(409).json({ code: 409, message: 'conflict' })
            }

            return res.status(400).json({ code: 400, message: 'bad request' })
        }
    }

    async update(req, res) {
        try {
            const repo = await prisma.repo.update({
                where: {
                    id: Number(req.params['id']),
                },
                data: {
                    name: req.body['name'],
                },
            })

            res.json(repo)
        } catch (e) {
            console.log(e)
            if (e instanceof PrismaClientKnownRequestError) {
                return res.status(409).json({ code: 409, message: 'conflict' })
            }

            return res.status(400).json({ code: 400, message: 'bad request' })
        }
    }

    async delete(req, res) {
        try {
            const repo = await prisma.repo.delete({
                where: {
                    id: Number(req.params['id']),
                },
            })

            res.json(repo)
        } catch (e) {
            console.log(e)
            if (e instanceof PrismaClientKnownRequestError) {
                return res.status(409).json({ code: 409, message: 'conflict' })
            }

            return res.status(400).json({ code: 400, message: 'bad request' })
        }
    }
}

export const controller = new reposContorller()
