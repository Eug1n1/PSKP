const { prisma } = require('../db')

class ProvidersController {
    static async getAll(_, res) {
        try {
            res.json(await prisma.provider.findMany())
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    static async getOneById(req, res) {
        try {
            const id = Number(req.params.id)

            res.json(await prisma.provider.findUniqueOrThrow({
                where: {
                    id
                }
            }))
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    static async create(req, res) {
        try {
            res.json(await prisma.provider.create({
                data: {
                    ...req.body
                }
            }))
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    static async update(req, res) {
        try {
            const id = Number(req.params.id)

            res.json(await prisma.provider.update({
                where: {
                    id
                },
                data: {
                    ...req.body
                }
            }))
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    static async delete(req, res) {
        try {
            const id = Number(req.params.id)

            res.json(await prisma.provider.delete({
                where: {
                    id
                }
            }))
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }
}

module.exports = ProvidersController
