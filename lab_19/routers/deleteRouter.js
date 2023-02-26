const router = require('express').Router()
const { prisma } = require('../prismaClient')

router.delete('/api/faculties/:faculty', async (req, res) => {
    try {
        res.json(
            await prisma.faculty.delete({
                where: {
                    faculty: req.params.faculty,
                },
            })
        )
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

router.delete('/api/pulpits/:pulpit', async (req, res) => {
    try {
        res.json(
            await prisma.pulpit.delete({
                where: {
                    pulpit: req.params.pulpit,
                },
            })
        )
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

router.delete('/api/subjects/:subject', async (req, res) => {
    try {
        res.json(
            await prisma.subject.delete({
                where: {
                    subject: req.params.subject,
                },
            })
        )
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})
router.delete('/api/teachers/:teacher', async (req, res) => {
    try {
        res.json(
            await prisma.teacher.delete({
                where: {
                    teacher: req.params.teacher,
                },
            })
        )
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

router.delete('/api/auditoriums/:auditorium', async (req, res) => {
    try {
        res.json(
            await prisma.auditorium.delete({
                where: {
                    auditorium: req.params.auditorium,
                },
            })
        )
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

router.delete('/api/auditoriumtypes/:auditoriumType', async (req, res) => {
    try {
        res.json(
            await prisma.auditoriumType.delete({
                where: {
                    auditoriumType: req.params.auditoriumType,
                },
            })
        )
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

module.exports = router
