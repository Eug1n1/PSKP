const { prisma } = require('../db')

class ItemsController {
    static async getAll(_, res) {
        const items = await prisma.item.findMany({
            select: {
                id: true,
                name: true,
                amount: true,
                MeasureUnit: {
                    select: {
                        shortName: true
                    }
                }
            }
        })

        res.render('items', { items: items })
    }

    static async getOneById(req, res) {
        try {
            const id = Number(req.params.id)

            const item = await prisma.item.findUniqueOrThrow({
                where: {
                    id
                },
                select: {
                    id: true,
                    name: true,
                    amount: true,
                    MeasureUnit: {
                        select: {
                            shortName: true
                        }
                    }
                }
            })

            res.render('itemById', { item })
        } catch (e) {
            console.log(1)
            res.status(404).end()
        }
    }

    static async create(req, res) {
        try {
            const item = await prisma.item.create({
                data: {
                    name: req.body.name,
                    amount: Number(req.body.amount),
                    MeasureUnit: {
                        connectOrCreate: {
                            where: {
                                shortName: req.body.measureUnit
                            },
                            create: {
                                shortName: req.body.measureUnit
                            }
                        }
                    }
                },
                select: {
                    id: true,
                    name: true,
                    amount: true,
                    MeasureUnit: {
                        select: {
                            shortName: true
                        }
                    }
                }
            })

            res.redirect(`/items/${item.id}`)
        } catch (e) {
            console.log(e)
            res.json(e)
        }
    }

    static async update(req, res) {
        try {
            const id = Number(req.params.id)

            const item = await prisma.item.update({
                where: {
                    id
                },
                data: {
                    name: req.body.name,
                    amount: req.body.amount,
                    MeasureUnit: {
                        connectOrCreate: {
                            where: {
                                shortName: req.body.measureUnit
                            },
                            create: {
                                shortName: req.body.measureUnit
                            }
                        }
                    }
                }
            })

            res.redirect(`/items/${item.id}`)
        } catch (e) {
            console.log(e)
            res.json(e)
        }
    }

    static async delete(req, res) {
        try {
            const id = Number(req.params.id)

            const item = await prisma.item.delete({
                where: {
                    id
                },
                select: {
                    id: true,
                    name: true,
                    amount: true,
                    MeasureUnit: {
                        select: {
                            shortName: true
                        }
                    }
                }
            })

            res.json(item)
        } catch (e) {
            res.json(e)
        }
    }
}

module.exports = ItemsController
