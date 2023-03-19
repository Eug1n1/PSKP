const { prisma } = require('../db')

class ProvidersController {
    static async getAll(_, res) {
        try {
            const providers = await prisma.provider.findMany({
                select: {
                    id: true,
                    name: true,
                    address: true,
                    contactPerson: true,
                    phone: true
                }
            })

            res.render('providers', { providers: providers })
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    static async getOneById(req, res) {
        try {
            const id = Number(req.params.id)
            const provider = await prisma.provider.findUniqueOrThrow({
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

            res.render('providerById', { provider })
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    static async create(req, res) {
        try {
            const provider = await prisma.provider.create({
                data: {
                    ...req.body
                },
                select: {
                    id: true
                }
            })

            res.redirect(`/providers/${provider.id}`)
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    static async update(req, res) {
        try {
            const id = Number(req.params.id)

            const provider = await prisma.provider.update({
                where: {
                    id
                },
                data: {
                    ...req.body
                }
            })

            res.redirect(`/providers/${provider.id}`)
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
