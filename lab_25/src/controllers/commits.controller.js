import prisma from '../db.js'
import defineAbilityFor from '../casl/casl-abilities.js'
import { subject, ForbiddenError } from '@casl/ability'
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

            switch (true) {
                case e instanceof ForbiddenError:
                    return res
                        .status(403)
                        .json({ code: 403, message: 'forbidden' })

                case e instanceof PrismaClientKnownRequestError:
                    return res
                        .status(409)
                        .json({ code: 409, message: 'conflict' })

                default:
                    return res
                        .status(400)
                        .json({ code: 400, message: 'bad request' })
            }
        }
    }

    async findOne(req, res) {
        try {
            const commit = await prisma.commit.findFirst({
                where: {
                    id: Number(req.params['commitId']),
                    repoId: Number(req.params['repoId']),
                },
                include: {
                    repo: true,
                },
            })

            if (!commit) {
                return res.status(404).json({ code: 404, message: 'not found' })
            }

            const ability = defineAbilityFor(req.user)
            ForbiddenError.from(ability).throwUnlessCan(
                'read',
                subject('Commit', commit)
            )

            res.json(commit)
        } catch (e) {
            console.log(e)

            switch (true) {
                case e instanceof ForbiddenError:
                    return res
                        .status(403)
                        .json({ code: 403, message: 'forbidden' })

                case e instanceof PrismaClientKnownRequestError:
                    return res
                        .status(409)
                        .json({ code: 409, message: 'conflict' })

                default:
                    return res
                        .status(400)
                        .json({ code: 400, message: 'bad request' })
            }
        }
    }

    async create(req, res) {
        try {
            const commit = await prisma.$transaction(async (tx) => {
                const commit = await tx.commit.create({
                    data: {
                        message: req.body['message'],
                        repo: {
                            connect: {
                                id: Number(req.params['repoId']),
                            },
                        },
                    },
                    include: {
                        repo: true,
                    },
                })

                const ability = defineAbilityFor(req.user)
                ForbiddenError.from(ability).throwUnlessCan(
                    'create',
                    subject('Commit', commit)
                )

                return commit
            })

            res.json(commit)
        } catch (e) {
            console.log(e)

            switch (true) {
                case e instanceof ForbiddenError:
                    return res
                        .status(403)
                        .json({ code: 403, message: 'forbidden' })

                case e instanceof PrismaClientKnownRequestError:
                    return res
                        .status(409)
                        .json({ code: 409, message: 'conflict' })

                default:
                    return res
                        .status(400)
                        .json({ code: 400, message: 'bad request' })
            }
        }
    }

    async update(req, res) {
        try {
            const commit = await prisma.$transaction(async (tx) => {
                const commit = await tx.commit.update({
                    where: {
                        id: Number(req.params['commitId']),
                    },
                    data: {
                        message: req.body['message'],
                    },
                    include: {
                        repo: true,
                    },
                })

                const ability = defineAbilityFor(req.user)
                ForbiddenError.from(ability).throwUnlessCan(
                    'update',
                    subject('Commit', commit)
                )

                return commit
            })

            res.json(commit)
        } catch (e) {
            console.log(e)

            switch (true) {
                case e instanceof ForbiddenError:
                    return res
                        .status(403)
                        .json({ code: 403, message: 'forbidden' })

                case e instanceof PrismaClientKnownRequestError:
                    return res
                        .status(409)
                        .json({ code: 409, message: 'conflict' })

                default:
                    return res
                        .status(400)
                        .json({ code: 400, message: 'bad request' })
            }
        }
    }

    async delete(req, res) {
        try {
            const commit = await prisma.$transaction(async (tx) => {
                const commit = await tx.commit.delete({
                    where: {
                        id: Number(req.params['commitId']),
                    },
                })

                const ability = defineAbilityFor(req.user)
                ForbiddenError.from(ability).throwUnlessCan(
                    'delete',
                    subject('Commit', commit)
                )

                return commit
            })

            res.json(commit)
        } catch (e) {
            console.log(e)

            switch (true) {
                case e instanceof ForbiddenError:
                    return res
                        .status(403)
                        .json({ code: 403, message: 'forbidden' })

                case e instanceof PrismaClientKnownRequestError:
                    return res
                        .status(409)
                        .json({ code: 409, message: 'conflict' })

                default:
                    return res
                        .status(400)
                        .json({ code: 400, message: 'bad request' })
            }
        }
    }
}

export const controller = new commitsController()
