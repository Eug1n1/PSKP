import prisma from '../db.js'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library.js'

class commitsController {
    async findAll(req, res) {
        try {
            const repo = await prisma.repo.findUnique({
                where: {
                    id: Number(req.params['repoId']),
                },
                include: {
                    Commits: true,
                },
            })

            if (!repo) {
                return res.status(404).json({ code: 404, message: 'not found' })
            }

            res.json(repo.Commits)
        } catch (e) {
            console.log(e)
            if (e instanceof PrismaClientKnownRequestError) {
                return res.status(409).json({ code: 409, message: 'conflict' })
            }

            return res.status(400).json({ code: 400, message: 'bad request' })
        }
    }

    async findOne(req, res) {
        try {
            const commit = await prisma.commit.findFirst({
                where: {
                    id: Number(req.params['commitId']),
                    repoId: Number(req.params['repoId']),
                },
            })

            if (!commit) {
                return res.status(404).json({ code: 404, message: 'not found' })
            }

            res.json(commit)
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
            const commit = await prisma.commit.create({
                data: {
                    message: req.body['message'],
                    repo: {
                        connect: {
                            id: Number(req.params['repoId']),
                        },
                    },
                },
            })

            res.json(commit)
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
            const commit = await prisma.commit.update({
                where: {
                    id: Number(req.params['commitId']),
                },
                data: {
                    message: req.body['message'],
                },
            })

            res.json(commit)
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
            const commit = await prisma.commit.delete({
                where: {
                    id: Number(req.params['commitId']),
                },
            })

            res.json(commit)
        } catch (e) {
            console.log(e)
            if (e instanceof PrismaClientKnownRequestError) {
                return res.status(409).json({ code: 409, message: 'conflict' })
            }

            return res.status(400).json({ code: 400, message: 'bad request' })
        }
    }
}

export const controller = new commitsController()
