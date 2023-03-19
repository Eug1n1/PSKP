const { prisma } = require('../db')

class MeasureUnitsController {
    static async getAll(_, res) {
        try {
            const units = await prisma.measureUnit.findMany({
                select: {
                    id: true,
                    shortName: true,
                    description: true,
                }
            })

            res.render('units', { units })
        } catch (e) {
            console.log(e)
            res.json(e)
        }
    }

    static async getOneById(req, res) {
        try {
            const id = Number(req.params.id)
            const unit = await prisma.measureUnit.findUniqueOrThrow({
                where: {
                    id
                },
                select: {
                    id: true,
                    shortName: true,
                    description: true,
                }
            })

            res.render('unitById', { unit })
        } catch (e) {
            console.log(e)
            res.status(404).end()
        }
    }

    static async create(req, res) {
        try {
            const unit = await prisma.measureUnit.create({
                data: {
                    ...req.body
                },
                select: {
                    id: true,
                    shortName: true,
                    description: true,
                }
            })


            res.redirect(`/units/${unit.id}`)
        } catch (e) {
            res.status(404).end(JSON.stringify(e))
        }
    }

    static async update(req, res) {
        try {
            const id = Number(req.params.id)


            res.json(await prisma.measureUnit.update({
                where: {
                    id
                },
                data: {
                    ...req.body
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

            res.json(await prisma.measureUnit.delete({
                where: {
                    id
                }
            }))
        } catch (e) {
            res.json(e)
        }
    }
}

module.exports = MeasureUnitsController
