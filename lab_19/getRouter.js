const getRouter = require('express').Router()
const PrismaClient = require('@prisma/client').PrismaClient

const prisma = new PrismaClient()

getRouter.get('/', (_, res) => {
    res.send('aboba')
})

getRouter.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

getRouter.get('/api/faculties', async (_, res) => {
    res.json(await prisma.faculty.findMany())
})

getRouter.get('/api/pulpits', async (_, res) => {
    res.json(await prisma.pulpit.findMany())
})

getRouter.get('/api/subjects', async (_, res) => {
    res.json(await prisma.subject.findMany())
})

getRouter.get('/api/teachers', async (_, res) => {
    res.json(await prisma.teacher.findMany())
})

getRouter.get('/api/auditoriums', async (_, res) => {
    res.json(await prisma.auditorium.findMany())
})

getRouter.get('/api/auditoriumtypes', async (_, res) => {
    res.json(await prisma.auditoriumType.findMany())
})

getRouter.get('/api/faculties/:faculty([A-Za-z]+)/subjects', async (req, res) => {
    const faculty = req.params.faculty

    res.json(
        await prisma.faculty.findUnique({
            where: {
                faculty: faculty,
            },
            select: {
                faculty: true,
                pulpits: {
                    select: {
                        pulpit: true,
                        subjects: {
                            select: {
                                subjectName: true,
                            },
                        },
                    },
                },
            },
        })
    )
})

getRouter.get(
    '/api/auditoriumtypes/:auditoriumType([A-Za-z]+)/auditoriums',
    async (req, res) => {
        const auditoriumType = req.params.auditoriumType

        res.json(
            await prisma.auditoriumType.findUnique({
                where: {
                    auditoriumType: auditoriumType,
                },
                select: {
                    auditoriumType: true,
                    auditoriums: {
                        select: {
                            auditorium: true,
                        },
                    },
                },
            })
        )
    }
)

getRouter.get('/api/auditoriumsWithComp1', async (req, res) => {
    res.json(
        await prisma.auditorium.findMany({
            where: {
                AND: [
                    {
                        auditoriumType: {
                            auditoriumType: 'LB',
                        },
                    },
                    { auditorium: { contains: '-1' } },
                ],
            },
        })
    )
})

getRouter.get('/api/puplitsWithoutTeachers', async (req, res) => {
    res.json(
        await prisma.pulpit.findMany({
            where: {
                teachers: {
                    none: {},
                },
            },
            select: {
                pulpit: true,
                teachers: true,
            },
        })
    )
})

getRouter.get('/api/pulpitsWithVladimir', async (req, res) => {
    res.json(
        await prisma.pulpit.findMany({
            where: {
                teachers: {
                    some: {
                        teacherName: { contains: 'Vladimir' },
                    },
                },
            },
            select: {
                pulpit: true,
                teachers: {
                    select: {
                        teacherName: true,
                    },
                },
            },
        })
    )
})

getRouter.get('/api/auditoriumsSameCount', async (req, res) => {
    res.json(
        await prisma.auditorium.groupBy({
            by: ['auditoriumCapacity', 'auditoriumTypeId'],
            _count: { auditorium: true },
            having: {
                auditorium: { _count: { gt: 1 } },
            },
        })
    )
})


module.exports = getRouter
