const router = require('express').Router()
const { prisma } = require('../db')

router.post('/api/faculties', async (req, res) => {
    try {
        if (req.body.pulpits) {
            res.json(
                await prisma.faculty.create({
                    data: {
                        faculty: req.body.faculty,
                        facultyName: req.body.facultyName,
                        pulpits: {
                            create: req.body.pulpits,
                        },
                    },
                    include: {
                        pulpits: true,
                    },
                })
            )
        } else {
            res.json(await prisma.faculty.create({ data: req.body }))
        }
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

router.post('/api/pulpits', async (req, res) => {
    try {
        if (req.body.faculty) {
            res.json(
                await prisma.pulpit.create({
                    data: {
                        pulpit: req.body.pulpit,
                        pulpitName: req.body.pulpitName,
                        faculty: {
                            connectOrCreate: {
                                where: {
                                    faculty: req.body.faculty.faculty,
                                },
                                create: req.body.faculty,
                            },
                        },
                    },
                    include: {
                        faculty: true,
                    },
                })
            )
        } else {
            res.json(await prisma.pulpit.create({ data: req.body }))
        }
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

router.post('/api/subjects', async (req, res) => {
    try {
        res.json(await prisma.subject.create({ data: req.body }))
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

router.post('/api/teachers', async (req, res) => {
    try {
        res.json(await prisma.teacher.create({ data: req.body }))
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

router.post('/api/auditoriums', async (req, res) => {
    try {
        res.json(await prisma.auditorium.create({ data: req.body }))
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

router.post('/api/auditoriumTypes', async (req, res) => {
    try {
        res.json(await prisma.auditoriumType.create({ data: req.body }))
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

module.exports = router
