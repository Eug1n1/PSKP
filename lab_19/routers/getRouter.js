const router = require('express').Router()
const path = require('path')
const { prisma } = require('../db')

router.get('/', (_, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})

router.get('/api/faculties', async (_, res) => {
    res.json(await prisma.faculty.findMany())
})

router.get('/api/pulpits', async (_, res) => {
    res.json(await prisma.pulpit.findMany())
})

router.get('/api/subjects', async (_, res) => {
    res.json(await prisma.subject.findMany())
})

router.get('/api/teachers', async (_, res) => {
    res.json(await prisma.teacher.findMany())
})

router.get('/api/auditoriums', async (_, res) => {
    res.json(await prisma.auditorium.findMany())
})

router.get('/api/auditoriumtypes', async (_, res) => {
    res.json(await prisma.auditoriumType.findMany())
})

router.get('/api/faculties/:faculty([A-Za-z]+)/subjects', async (req, res) => {
    const { faculty } = req.params

    res.json(
        await prisma.faculty.findUnique({
            where: {
                faculty,
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

// fluent api
router.get('/api/faculty/:faculty/pulpits', async (req, res) => {
    let { faculty } = req.params

    res.json(
        await prisma.faculty
            .findUnique({
                where: {
                    faculty,
                },
            })
            .pulpits()
    )
})

router.get(
    '/api/auditoriumtypes/:auditoriumType([A-Za-z]+)/auditoriums',
    async (req, res) => {
        const { auditoriumType } = req.params

        res.json(
            await prisma.auditoriumType.findUnique({
                where: {
                    auditoriumType,
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

router.get('/api/auditoriumsWithComp1', async (_, res) => {
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

router.get('/api/puplitsWithoutTeachers', async (_, res) => {
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

router.get('/api/pulpitsWithVladimir', async (_, res) => {
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

router.get('/api/auditoriumsSameCount', async (_, res) => {
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

router.get('/api/pulpit_page', async (req, res) => {
    let take = 4
    let { page } = req.query

    if (page < 0) {
        res.status(400)
        res.json({
            error: 'invalid page number',
        })
        return
    }

    let pulpits = await prisma.pulpit.findMany({
        take: take,
        skip: page * take,
        include: {
            _count: {
                select: {
                    teachers: true,
                },
            },
        },
    })

    if (pulpits.length == 0) {
        res.status(400)
        res.json({
            error: 'invalid page number',
        })
        return
    }

    res.json(pulpits)
})

module.exports = router
