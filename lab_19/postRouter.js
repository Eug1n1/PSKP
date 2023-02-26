const router = require('express').Router()
const PrismaClient = require('@prisma/client').PrismaClient

const prisma = new PrismaClient()

router.post('/api/faculties', async (req, res) => {
    try {
        res.json(await prisma.faculty.create({ data: req.body }))
    } catch (e) {
        res.status(400)
        res.json(e)
    }
})

router.post('/api/pulpits', async (req, res) => {
    try {
        res.json(await prisma.pulpit.create({ data: req.body }))
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
