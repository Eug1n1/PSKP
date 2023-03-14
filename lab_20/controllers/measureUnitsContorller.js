const { prisma } = require('../db')

class MeasureUnitsController {
    static async getAll(_, res) {
        try {
            res.json(await prisma.measureUnit.findMany())
        } catch (e) {
            console.log(e)
            res.json(e)
        }
    }

    static async getOneById(req, res) {
        try {
            const id = Number(req.params.id)

            res.json(await prisma.measureUnit.findUniqueOrThrow({
                where: {
                    id
                }
            }))
        } catch (e) {
            console.log(e)
            res.json(e)
        }
    }

    static async create(req, res) {
        try {
            res.json(await prisma.measureUnit.create({
                data: {
                    ...req.body
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
