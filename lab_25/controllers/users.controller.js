import prisma from '../db.js'

class usersController {
    async findAll(_, res) {
        const users = await prisma.user.findMany()

        res.json(
            users.map((user) => {
                return delete user['password']
            })
        )
    }

    async findOne(req, res) {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(req.params.id),
            },
        })

        if (!user) {
            return res.writeHead(404).end('not found')
        }

        delete user['password']
        res.json(user)
    }
}

export const constoller = new usersController()
