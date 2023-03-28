const { prisma } = require('../db')

class ClientsController {
    static async getAll(_, res) {
        try {
            const clients = await prisma.employee.findMany({
                select: {
                    id: true,
                    name: true,
                    position: true,
                    address: true,
                    phone: true,
                }
            })

            res.render('employees', { units: clients })
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    static async getOneById(req, res) {
        try {
            const id = Number(req.params.id)
            const client = await prisma.employee.findUniqueOrThrow({
                where: {
                    id
                },
                select: {
                    id: true,
                    name: true,
                    position: true,
                    address: true,
                    phone: true,
                }
            })

            res.render('employeeById', { unit: client })
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    static async create(req, res) {
        try {
            const client = await prisma.employee.create({
                data: {
                    ...req.body
                }
            })

            res.redirect(`/employees/${client.id}`)
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    static async update(req, res) {
        try {
            const id = Number(req.params.id)
            const client = await prisma.employee.update({
                where: {
                    id
                },
                data: {
                    ...req.body
                }
            })

            res.redirect(`/employees/${client.id}`)
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    static async delete(req, res) {
        try {
            const id = Number(req.params.id)

            res.json(await prisma.employee.delete({
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
