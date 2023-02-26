const PrismaClient = require('@prisma/client').PrismaClient
const prisma = new PrismaClient()

;(async () => {
    await prisma.faculty.create({
        data: {
            faculty: 'IT',
            facultyName: 'asdfadsf',
        },
    })
    await prisma.faculty.create({
        data: {
            faculty: 'FOF',
            facultyName: 'Forest',
        },
    })

    await prisma.pulpit.create({
        data: {
            pulpit: 'POIT',
            pulpitName: 'asdfadsf',
            facultyId: 'IT',
        },
    })
    await prisma.pulpit.create({
        data: {
            pulpit: 'ISIT',
            pulpitName: 'aboba',
            facultyId: 'IT',
        },
    })
    await prisma.pulpit.create({
        data: {
            pulpit: 'FOFI',
            pulpitName: 'FOFI and friends',
            facultyId: 'FOF',
        },
    })

    await prisma.subject.create({
        data: {
            subject: 'NODEJS',
            subjectName: 'asdfadsf',
            pulpitId: 'POIT',
        },
    })
    await prisma.subject.create({
        data: {
            subject: 'DB',
            subjectName: 'asdfadsf',
            pulpitId: 'POIT',
        },
    })
    await prisma.subject.create({
        data: {
            subject: 'BOBER',
            subjectName: 'asdfadsf',
            pulpitId: 'ISIT',
        },
    })
    await prisma.subject.create({
        data: {
            subject: 'FOFA',
            subjectName: 'asdfadsf',
            pulpitId: 'FOFI',
        },
    })

    await prisma.teacher.create({
        data: {
            teacher: 'NODEJS',
            teacherName: 'asdfadsf',
            pulpitId: 'POIT',
        },
    })
    await prisma.teacher.create({
        data: {
            teacher: 'DVK',
            teacherName: 'Vladimir Aboba',
            pulpitId: 'POIT',
        },
    })

    await prisma.auditoriumType.create({
        data: {
            auditoriumType: 'LK',
            auditoriumTypeName: 'asdfadsf',
        },
    })
    await prisma.auditoriumType.create({
        data: {
            auditoriumType: 'LB',
            auditoriumTypeName: 'asdfadsf',
        },
    })

    await prisma.auditorium.create({
        data: {
            auditorium: '313-1',
            auditoriumName: 'asdfadsf',
            auditoriumCapacity: 100,
            auditoriumTypeId: 'LK',
        },
    })
    await prisma.auditorium.create({
        data: {
            auditorium: '200-3a',
            auditoriumName: 'asdfadsf',
            auditoriumCapacity: 190,
            auditoriumTypeId: 'LK',
        },
    })
    await prisma.auditorium.create({
        data: {
            auditorium: '199-3a',
            auditoriumName: 'asdfadsf',
            auditoriumCapacity: 60,
            auditoriumTypeId: 'LK',
        },
    })
    await prisma.auditorium.create({
        data: {
            auditorium: '322-1',
            auditoriumName: 'asdfadsf',
            auditoriumCapacity: 15,
            auditoriumTypeId: 'LB',
        },
    })
})()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
