const express = require('express')
const path = require('path')
const { Transaction, Op } = require('sequelize')

const {
    Faculty,
    Pulpit,
    sequelize,
    Subject,
    Teacher,
    Auditorium,
    AuditoriumType,
} = require('./models/index')

const app = express()

app.use(express.json())
;(async () => {
    await sequelize.authenticate()
    console.log('connected')

    await sequelize.sync({ force: true })

    await Faculty.create({ faculty: 'IT', facultyName: 'asdfadsf' })
    await Faculty.create({ faculty: 'FOF', facultyName: 'Forest' })

    await Pulpit.create({
        pulpit: 'POIT',
        pulpitName: 'asdfadsf',
        faculty: 'IT',
    })
    await Pulpit.create({
        pulpit: 'ISIT',
        pulpitName: 'aboba',
        faculty: 'IT',
    })
    await Pulpit.create({
        pulpit: 'FOFI',
        pulpitName: 'FOFI and friends',
        faculty: 'FOF',
    })

    await Subject.create({
        subject: 'NODEJS',
        subjectName: 'asdfadsf',
        pulpit: 'POIT',
    })
    await Subject.create({
        subject: 'DB',
        subjectName: 'asdfadsf',
        pulpit: 'POIT',
    })
    await Subject.create({
        subject: 'BOBER',
        subjectName: 'asdfadsf',
        pulpit: 'ISIT',
    })
    await Subject.create({
        subject: 'FOFA',
        subjectName: 'asdfadsf',
        pulpit: 'FOFI',
    })

    await Teacher.create({
        teacher: 'NODEJS',
        teacherName: 'asdfadsf',
        pulpit: 'POIT',
    })

    await AuditoriumType.create({
        auditoriumType: 'LK',
        auditoriumTypeName: 'asdfadsf',
    })
    await AuditoriumType.create({
        auditoriumType: 'LB',
        auditoriumTypeName: 'asdfadsf',
    })

    await Auditorium.create({
        auditorium: '313-1',
        auditoriumName: 'asdfadsf',
        auditoriumCapacity: 100,
        auditoriumType: 'LK',
    })
    await Auditorium.create({
        auditorium: '200-3a',
        auditoriumName: 'asdfadsf',
        auditoriumCapacity: 190,
        auditoriumType: 'LK',
    })
    await Auditorium.create({
        auditorium: '199-3a',
        auditoriumName: 'asdfadsf',
        auditoriumCapacity: 60,
        auditoriumType: 'LK',
    })
    await Auditorium.create({
        auditorium: '322-1',
        auditoriumName: 'asdfadsf',
        auditoriumCapacity: 15,
        auditoriumType: 'LB',
    })
})()

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/api/faculties', async (_req, res) => {
    res.json(await Faculty.findAll())
})

app.get('/api/pulpits', async (_req, res) => {
    res.json(await Pulpit.findAll())
})
app.get('/api/subjects', async (_req, res) => {
    res.json(await Subject.findAll())
})
app.get('/api/teachers', async (_req, res) => {
    res.json(await Teacher.findAll())
})
app.get('/api/auditoriums', async (_req, res) => {
    res.json(await Auditorium.findAll())
})
app.get('/api/auditoriumtypes', async (_req, res) => {
    res.json(await AuditoriumType.findAll())
})

app.get('/api/faculties/:faculty([A-Za-z]+)/subjects', async (req, res) => {
    const faculty = req.params.faculty

    res.json(
        await Faculty.findAll({
            attributes: ['faculty'],
            where: { faculty: faculty },
            include: [
                {
                    model: Pulpit,
                    attributes: ['pulpit', 'faculty'],
                    include: [
                        {
                            model: Subject,
                            attributes: ['subject', 'pulpit'],
                        },
                    ],
                },
            ],
        })
    )
})

app.get(
    '/api/auditoriumtypes/:auditoriumType([A-Za-z]+)/auditoriums',
    async (req, res) => {
        const auditoriumType = req.params.auditoriumType

        res.json(
            await AuditoriumType.findAll({
                attributes: ['auditoriumType'],
                include: [
                    {
                        model: Auditorium,
                        required: true,
                        attributes: ['auditorium', 'auditoriumType'],
                        where: { auditoriumType: auditoriumType },
                    },
                ],
            })
        )
    }
)

app.get('/api/scope', async (_req, res) => {
    res.json(await Auditorium.scope('scoop').findAll())
})

app.post('/api/faculties', async (req, res) => {
    try {
        res.json(await Faculty.create(req.body))
    } catch (e) {
        console.log(e)

        res.status(400)
        res.json(e)
    }
})

app.post('/api/pulpits', async (req, res) => {
    try {
        res.json(await Pulpit.create(req.body))
    } catch (e) {
        console.log(e)

        res.status(400)
        res.json(e)
    }
})

app.post('/api/subjects', async (req, res) => {
    try {
        res.json(await Subject.create(req.body))
    } catch (e) {
        console.log(e)

        res.status(400)
        res.json(e)
    }
})

app.post('/api/teachers', async (req, res) => {
    try {
        res.json(await Teacher.create(req.body))
    } catch (e) {
        console.log(e)

        res.status(400)
        res.json(e)
    }
})

app.post('/api/auditoriums', async (req, res) => {
    try {
        res.json(await Auditorium.create(req.body))
    } catch (e) {
        console.log(e)

        res.status(400)
        res.json(e)
    }
})

app.post('/api/auditoriumTypes', async (req, res) => {
    try {
        res.json(await AuditoriumType.create(req.body))
    } catch (e) {
        console.log(e)

        res.status(400)
        res.json(e)
    }
})

app.put('/api/faculties', async (req, res) => {
    try {
        let faculty = await Faculty.findByPk(req.body.faculty)
        if (faculty === null) {
            throw { error: 'no such faculty' }
        }

        await faculty?.update(req.body)

        res.json(faculty)
    } catch (e) {
        console.log(e)

        res.status(400)
        res.json(e)
    }
})

app.put('/api/pulpits', async (req, res) => {
    try {
        let pulpit = await Pulpit.findByPk(req.body.pulpit)
        if (pulpit === null) {
            throw { error: 'no such pulpit' }
        }

        await pulpit?.update(req.body)

        res.json(pulpit)
    } catch (e) {
        console.log(e)

        res.status(400)
        res.json(e)
    }
})

app.put('/api/subjects', async (req, res) => {
    try {
        let subject = await Subject.findByPk(req.body.subject)
        if (subject === null) {
            throw { error: 'no such subject' }
        }

        await subject?.update(req.body)

        res.json(subject)
    } catch (e) {
        console.log(e)

        res.status(400)
        res.json(e)
    }
})

app.put('/api/teachers', async (req, res) => {
    try {
        let teacher = await Teacher.findByPk(req.body.teacher)
        if (teacher === null) {
            throw { error: 'no such teacher' }
        }

        await teacher?.update(req.body)

        res.json(teacher)
    } catch (e) {
        console.log(e)

        res.status(400)
        res.json(e)
    }
})

app.put('/api/auditoriums', async (req, res) => {
    try {
        let auditorium = await Auditorium.findByPk(req.body.auditorium)
        if (auditorium === null) {
            throw { error: 'no such auditorium' }
        }

        await auditorium?.update(req.body)

        res.json(auditorium)
    } catch (e) {
        console.log(e)

        res.status(400)
        res.json(e)
    }
})

app.put('/api/auditoriumtypes', async (req, res) => {
    try {
        let auditoriumType = await AuditoriumType.findByPk(
            req.body.auditoriumType
        )
        if (auditoriumType === null) {
            throw { error: 'no such auditorium type' }
        }

        await auditoriumType?.update(req.body)

        res.json(auditoriumType)
    } catch (e) {
        console.log(e)

        res.status(400)
        res.json(e)
    }
})

app.put('/api/transaction', async (req, res) => {
    let transaction = await sequelize.transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
    })

    await Auditorium.update({ auditoriumCapacity: 0 }, {
        transaction: transaction,
        where: {
            auditoriumCapacity: {
                [Op.gt]: 0
            }
        }
    })

    setTimeout(async () => {
        await transaction.rollback()
    }, 10000)

    res.json(await Auditorium.findAll({
        transaction: transaction
    }))
})

app.delete('/api/faculties/:faculty', async (req, res) => {
    try {
        let faculty = await Faculty.findByPk(req.params.faculty)
        if (faculty === null) {
            throw { error: 'no such faculty' }
        }

        await Faculty.destroy({
            where: {
                faculty: req.params.faculty,
            },
        })

        res.json(faculty)
    } catch (e) {
        console.log(e)

        res.status(400)
        res.json(e)
    }
})

app.delete('/api/pulpit/:pulpit', async (req, res) => {
    try {
        let pulpit = await Pulpit.findByPk(req.params.pulpit)
        if (pulpit === null) {
            throw { error: 'no such pulpit' }
        }

        await pulpit.destroy({
            where: {
                pulpit: req.params.pulpit,
            },
        })

        res.json(pulpit)
    } catch (e) {
        console.log(e)

        res.status(400)
        res.json(e)
    }
})

app.delete('/api/subjects/:subject', async (req, res) => {
    try {
        let subject = await Subject.findByPk(req.params.subject)
        if (subject === null) {
            throw { error: 'no such subject' }
        }

        await subject.destroy({
            where: {
                subject: req.params.subject,
            },
        })

        res.json(subject)
    } catch (e) {
        console.log(e)

        res.status(400)
        res.json(e)
    }
})

app.delete('/api/teachers/:teacher', async (req, res) => {
    try {
        let teacher = await Teacher.findByPk(req.params.teacher)
        if (teacher === null) {
            throw { error: 'no such teacher' }
        }

        await teacher.destroy({
            where: {
                teacher: req.params.teacher,
            },
        })

        res.json(teacher)
    } catch (e) {
        console.log(e)

        res.status(400)
        res.json(e)
    }
})

app.delete('/api/auditoriums/:auditorium', async (req, res) => {
    try {
        let auditorium = await Auditorium.findByPk(req.params.auditorium)
        if (auditorium === null) {
            throw { error: 'no such auditorium' }
        }

        await auditorium.destroy({
            where: {
                auditorium: req.params.auditorium,
            },
        })

        res.json(auditorium)
    } catch (e) {
        console.log(e)

        res.status(400)
        res.json(e)
    }
})

app.delete('/api/auditoriumtypes/:auditoriumType', async (req, res) => {
    try {
        let auditoriumType = await AuditoriumType.findByPk(
            req.params.auditoriumType
        )
        if (auditoriumType === null) {
            throw { error: 'no such auditoriumType' }
        }

        await auditoriumType.destroy({
            where: {
                auditoriumType: req.params.auditoriumType,
            },
        })

        res.json(auditoriumType)
    } catch (e) {
        console.log(e)

        res.status(400)
        res.json(e)
    }
})

app.listen(3000)
