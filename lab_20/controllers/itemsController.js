const { prisma } = require('../db')

class ItemsController {
    static async getAll(_, res) {
        const items = await prisma.item.findMany()

        res.render('items.hbs', { items: items })
    }

    static async getOneById(req, res) {
        try {
            const id = Number(req.params.id)

            const items = await prisma.item.findUniqueOrThrow({
                where: {
                    id
                }
            })

            res.render('items.hbs', { items: items })
        } catch (e) {
            res.json(e)
        }
    }

    static async create(req, res) {
        try {
            res.json(await prisma.item.create({
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
            }))
        } catch (e) {
            console.log(e)
            res.json(e)
        }
    }

    static async update(req, res) {
        try {
            const id = Number(req.params.id)

            res.json(await prisma.item.update({
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
            }))
        } catch (e) {
            console.log(e)
            res.json(e)
        }
    }

    static async delete(req, res) {
        try {
            const id = Number(req.params.id)

            res.json(await prisma.item.delete({
                where: {
                    id
                }
            }))
        } catch (e) {
            res.json(e)
        }
    }
}

module.exports = ItemsController
