const { prisma } = require('../db')

class ProvidersController {
    static async getAll(_, res) {
        try {
            const deliveries = await prisma.delivery.findMany({
                select: {
                    id: true,
                    price: true,
                    person: true,
                    deliveryDate: true,
                    employeeId: true,
                    documentId: true,
                    providerId: true,
                    itemId: true,
                    amount: true,
                }
            })

            res.render('deliveries', { deliveries: deliveries })
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    static async getOneById(req, res) {
        try {
            const id = Number(req.params.id)
            const delivery = await prisma.delivery.findUniqueOrThrow({
                where: {
                    id
                },
                select: {
                    id: true,
                    price: true,
                    person: true,
                    deliveryDate: true,
                    employeeId: true,
                    documentId: true,
                    providerId: true,
                    itemId: true,
                    amount: true,
                }
            })

            res.render('deliveryById', { delivery })
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    static async create(req, res) {
        try {
            const body = req.body

            const provider = await prisma.delivery.create({
                data: {
                    amount: Number(body.amount),
                    price: Number(body.price),
                    person: body.person,
                    Employee: {
                        connect: {
                            id: Number(body.employeeId)
                        }
                    },
                    Document: {
                        connect: {
                            id: Number(body.documentId)
                        }
                    },
                    Provider: {
                        connect: {
                            id: Number(body.providerId)
                        }
                    },
                    Item: {
                        connect: {
                            id: Number(body.itemId)
                        }
                    }
                },
                select: {
                    id: true
                }
            })

            res.redirect(`/deliveries/${provider.id}`)
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    static async update(req, res) {
        try {
            const id = Number(req.params.id)
            const body = req.body

            const provider = await prisma.delivery.update({
                where: {
                    id
                },
                data: {
                    amount: Number(body.amount),
                    price: Number(body.price),
                    person: body.person,
                    Employee: {
                        connect: {
                            id: Number(body.employeeId)
                        }
                    },
                    Document: {
                        connect: {
                            id: Number(body.documentId)
                        }
                    },
                    Provider: {
                        connect: {
                            id: Number(body.providerId)
                        }
                    },
                    Item: {
                        connect: {
                            id: Number(body.itemId)
                        }
                    }
                },
            })

            res.redirect(`/deliveries/${provider.id}`)
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    static async delete(req, res) {
        try {
            const id = Number(req.params.id)

            res.json(await prisma.delivery.delete({
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
