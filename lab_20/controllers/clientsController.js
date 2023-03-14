const { prisma } = require('../db')

class ClientsController {
    static async getAll(_, res) {
        try {
            res.json(await prisma.client.findMany())
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    static async getOneById(req, res) {
        try {
            const id = Number(req.params.id)

            res.json(await prisma.client.findUniqueOrThrow({
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
            res.json(await prisma.client.create({
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

            res.json(await prisma.client.update({
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

            res.json(await prisma.client.delete({
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

module.exports = ClientsController
