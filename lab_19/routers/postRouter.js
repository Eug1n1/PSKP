const router = require('express').Router()
const { prisma } = require('../db')

router.post('/api/faculties', async (req, res) => {
    try {
        let {faculty, facultyName, pulpits} = req.body
        if (pulpits) {
            res.json(
                await prisma.faculty.create({
                    data: {
                        faculty,
                        facultyName,
                        pulpits: {
                            create: pulpits,
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
        let {pulpit, pulpitName, faculty} = req.body
        if (faculty) {
            res.json(
                await prisma.pulpit.create({
                    data: {
                        pulpit,
                        pulpitName,
                        faculty: {
                            connectOrCreate: {
                                where: {
                                    faculty: faculty.faculty,
                                },
                                create: faculty,
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
