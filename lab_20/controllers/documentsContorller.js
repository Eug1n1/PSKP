const { prisma } = require('../db')

class MeasureUnitsController {
    static async getAll(_, res) {
        try {
            const units = await prisma.document.findMany({
                select: {
                    id: true,
                    documentType: true,
                    documentNumber: true,
                }
            })

            res.render('documents', { units })
        } catch (e) {
            console.log(e)
            res.json(e)
        }
    }

    static async getOneById(req, res) {
        try {
            const id = Number(req.params.id)
            const unit = await prisma.document.findUniqueOrThrow({
                where: {
                    id
                },
                select: {
                    id: true,
                    documentNumber: true,
                    documentType: true,
                }
            })

            res.render('documentById', { unit })
        } catch (e) {
            console.log(e)
            res.status(404).end()
        }
    }

    static async create(req, res) {
        try {
            const unit = await prisma.document.create({
                data: {
                    ...req.body
                },
                select: {
                    id: true,
                    documentNumber: true,
                    documentType: true,
                }
            })


            res.redirect(`/documents/${unit.id}`)
        } catch (e) {
            res.status(404).end(JSON.stringify(e))
        }
    }

    static async update(req, res) {
        try {
            const id = Number(req.params.id)


            const client = await prisma.document.update({
                where: {
                    id
                },
                data: {
                    ...req.body
                }
            })

            res.redirect(`/documents/${client.id}`)
        } catch (e) {
            console.log(e)
            res.json(e)
        }
    }

    static async delete(req, res) {
        try {
            const id = Number(req.params.id)

            res.json(await prisma.document.delete({
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
