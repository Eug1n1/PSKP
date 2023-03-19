const { prisma } = require('../db')

class ClientsController {
    static async getAll(_, res) {
        try {
            const clients = await prisma.client.findMany({
                select: {
                    id: true,
                    name: true,
                    address: true,
                    contactPerson: true,
                    phone: true
                }
            })

            res.render('clients', { clients })
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    static async getOneById(req, res) {
        try {
            const id = Number(req.params.id)
            const client = await prisma.client.findUniqueOrThrow({
                where: {
                    id
                },
                select: {
                    id: true,
                    name: true,
                    address: true,
                    contactPerson: true,
                    phone: true
                }
            })

            res.render('clientById', { client })
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    static async create(req, res) {
        try {
            const client = await prisma.client.create({
                data: {
                    ...req.body
                }
            })

            res.redirect(`/clients/${client.id}`)
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    static async update(req, res) {
        try {
            const id = Number(req.params.id)
            const client = await prisma.client.update({
                where: {
                    id
                },
                data: {
                    ...req.body
                }
            })

            res.redirect(`/clients/${client.id}`)
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
