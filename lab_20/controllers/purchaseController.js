const { prisma } = require('../db')

class ProvidersController {
    static async getAll(_, res) {
        try {
            const providers = await prisma.purchase.findMany({
                select: {
                    id: true,
                    price: true,
                    person: true,
                    purchaseDate: true,
                    employeeId: true,
                    documentId: true,
                    clientId: true,
                    itemId: true,
                    amount: true,
                }
            })

            res.render('purchases', { deliveries: providers })
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    static async getOneById(req, res) {
        try {
            const id = Number(req.params.id)

            const provider = await prisma.purchase.findUniqueOrThrow({
                where: {
                    id
                },
                select: {
                    id: true,
                    price: true,
                    person: true,
                    purchaseDate: true,
                    employeeId: true,
                    documentId: true,
                    clientId: true,
                    itemId: true,
                    amount: true,
                }
            })

            res.render('purchaseById', { delivery: provider })
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    static async create(req, res) {
        try {
            const body = req.body

            const provider = await prisma.purchase.create({
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
                    Client: {
                        connect: {
                            id: Number(body.clientId)
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

            res.redirect(`/purchases/${provider.id}`)
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    static async update(req, res) {
        try {
            const id = Number(req.params.id)
            const body = req.body

            const provider = await prisma.purchase.update({
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
                    Client: {
                        connect: {
                            id: Number(body.clientId)
                        }
                    },
                    Item: {
                        connect: {
                            id: Number(body.itemId)
                        }
                    }
                }
            })

            res.redirect(`/purchases/${provider.id}`)
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    static async delete(req, res) {
        try {
            const id = Number(req.params.id)

            res.json(await prisma.purchase.delete({
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
