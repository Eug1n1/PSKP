import prisma from '../db.js'

class usersController {
    async findAll(_, res) {
        const users = await prisma.user.findMany()

        res.json(
            users.map((user) => {
                const { rt, password, ...rest } = user
                return rest
            })
        )
    }

    async findOne(req, res) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: Number(req.params.id),
                },
            })

            if (!user) {
                return res.writeHead(404).end('not found')
            }

            const { rt, password, ...rest } = user
            res.json(rest)
        } catch (e) {
            console.log(e)
            if (e instanceof PrismaClientKnownRequestError) {
                return res.status(409).json({ code: 409, message: 'conflict' })
            }

            return res.status(400).json({ code: 400, message: 'bad request' })
        }
    }
}

export const constoller = new usersController()
