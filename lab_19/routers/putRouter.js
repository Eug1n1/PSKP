const router = require('express').Router()
const { prisma } = require('../db')

router.put('/api/faculties', async (req, res) => {
    try {
        res.json(
            await prisma.faculty.update({
                data: req.body,
                where: {
                    faculty: req.body.faculty,
                },
            })
        )
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

router.put('/api/pulpits', async (req, res) => {
    try {
        res.json(
            await prisma.pulpit.update({
                data: req.body,
                where: {
                    pulpit: req.body.pulpit,
                },
            })
        )
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

router.put('/api/subjects', async (req, res) => {
    try {
        res.json(
            await prisma.subject.update({
                data: req.body,
                where: {
                    subject: req.body.subject,
                },
            })
        )
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

router.put('/api/teachers', async (req, res) => {
    try {
        res.json(
            await prisma.teacher.update({
                data: req.body,
                where: {
                    teacher: req.body.teacher,
                },
            })
        )
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

router.put('/api/auditoriums', async (req, res) => {
    try {
        res.json(
            await prisma.auditorium.update({
                data: req.body,
                where: {
                    auditorium: req.body.auditorium,
                },
            })
        )
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

router.put('/api/auditoriumtypes', async (req, res) => {
    try {
        res.json(
            await prisma.auditoriumType.update({
                data: req.body,
                where: {
                    auditoriumType: req.body.auditoriumType,
                },
            })
        )
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

router.put('/api/transaction', async (_, res) => {
    await prisma
        .$transaction(async (tx) => {
            await tx.auditorium.updateMany({
                data: {
                    auditoriumCapacity: {
                        increment: 100,
                    },
                },
            })

            res.json(await tx.auditorium.findMany())

            throw 'rollback transaction'
        })
        .catch((e) => {
            console.log(e)
        })
})

module.exports = router
