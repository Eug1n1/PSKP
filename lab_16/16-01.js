const http = require('http')
const fs = require('fs')
const { graphql } = require('graphql')

const DB = require('./DB')

let db = new DB()

var rootValue = {
    Faculty: {
        pulpits: async (args) => {
            let pulpits = await db.getPulpitsByFaculty(args.faculty)

            return pulpits.recordset
        },
    },
    Pulpit: {
        faculty: async (args) => {
            // console.log('args')
            let faculty = await db.getFaculty(args.faculty)

            return faculty.recordset[0]
        },
        subjects: async (args) => {
            let subjects = await db.getPulpitSubjects(args.pulpit)

            return subjects.recordset
        },
        teachers: async (args) => {
            let teachers = await db.getPulpitTeachers(args.pulpit)

            return teachers.recordset
        },
    },
    Teacher: {
        pulpit: async (args) => {
            let pulpit = await db.getPulpit(args.pulpit)

            return pulpit.recordset[0]
        },
    },
    Subject: {
        pulpit: async (args) => {
            let pulpit = await db.getPulpit(args.pulpit)

            return pulpit.recordset[0]
        },
    },
    Query: {
        hello: () => {
            return 'Hello world!'
        },
        getFaculties: async (_obj, args) => {
            try {
                if (args.faculty) {
                    let faculty = await db.getFaculty(args.faculty)

                    return faculty
                }

                let faculties = (await db.getFaculties()).recordset

                return faculties
            } catch (e) {
                throw {
                    error: e.message,
                }
            }
        },
        getTeachers: async (_, args) => {
            try {
                if (args.teacher) {
                    let teacher = await db.getTeacher(args.teacher)

                    return teacher.recordset
                }

                let teachers = (await db.getTeachers()).recordset

                return teachers
            } catch (e) {
                throw {
                    error: e.message,
                }
            }
        },
        getPulpits: async (_, args) => {
            try {
                if (args.pulpit) {
                    let pulpit = await db.getPulpit(args.pulpit)

                    return pulpit.recordset
                }

                let pulpits = (await db.getPulpits()).recordset

                return pulpits
            } catch (e) {
                throw {
                    error: e.message,
                }
            }
        },
        getSubjects: async (_, args) => {
            try {
                if (args.subject) {
                    let subject = await db.getSubject(args.subject)

                    return subject.recordset
                }

                let subjects = (await db.getSubjects()).recordset

                return subjects
            } catch (e) {
                throw {
                    error: e.message,
                }
            }
        },
        getTeachersByFaculty: async (_, args) => {
            try {
                let teachers = await db.getTeachersByFaculty(args.faculty)

                return teachers.recordset
            } catch (e) {
                throw {
                    error: e.message,
                }
            }
        },
        getSubjectsByFaculty: async (_, args) => {
            //FIXME: ya huy znaet chto ono dolzhno delat'
            try {
                let subjects = await db.getSubjectsByFaculty(args.faculty)

                return subjects.recordset
            } catch (e) {
                throw {
                    error: e.message,
                }
            }
        },
    },
    Mutation: {
        setFaculty: async (_, args) => {
            try {
                let faculty = await db.getFaculty(args.faculty.faculty)

                if (faculty.recordset[0]) {
                    await db.putFaculty(
                        args.faculty.faculty,
                        args.faculty.faculty_name
                    )
                } else {
                    await db.postFaculty(
                        args.faculty.faculty,
                        args.faculty.faculty_name
                    )
                }

                faculty = await db.getFaculty(args.faculty.faculty)

                return faculty.recordset[0]
            } catch (e) {
                throw {
                    error: e.message,
                }
            }
        },
        setTeacher: async (_, args) => {
            try {
                let teacher = await db.getTeacher(args.teacher.teacher)

                if (teacher.recordset[0]) {
                    await db.putTeacher(
                        args.teacher.teacher,
                        args.teacher.teacher_name,
                        args.teacher.pulpit
                    )
                } else {
                    await db.postTeacher(
                        args.teacher.teacher,
                        args.teacher.teacher_name,
                        args.teacher.pulpit
                    )
                }

                teacher = await db.getTeacher(args.teacher.teacher)

                return teacher.recordset[0]
            } catch (e) {
                throw {
                    error: e.message,
                }
            }
        },
        setPulpit: async (_, args) => {
            try {
                let pulpit = await db.getPulpit(args.pulpit.pulpit)

                if (pulpit.recordset[0]) {
                    await db.putPulpit(
                        args.pulpit.pulpit,
                        args.pulpit.pulpit_name,
                        args.pulpit.faculty
                    )
                } else {
                    await db.postPulpit(
                        args.pulpit.pulpit,
                        args.pulpit.pulpit_name,
                        args.pulpit.faculty
                    )
                }

                pulpit = await db.getPulpit(args.pulpit.pulpit)

                return pulpit.recordset[0]
            } catch (e) {
                throw {
                    error: e.message,
                }
            }
        },
        setSubject: async (_, args) => {
            try {
                let subject = await db.getSubject(args.subject.subject)

                if (subject.recordset[0]) {
                    await db.putSubject(
                        args.subject.subject,
                        args.subject.subject_name,
                        args.subject.pulpit
                    )
                } else {
                    await db.postSubject(
                        args.subject.subject,
                        args.subject.subject_name,
                        args.subject.pulpit
                    )
                }

                subject = await db.getSubject(args.subject.subject)

                return subject.recordset[0]
            } catch (e) {
                throw {
                    error: e.message,
                }
            }
        },
        delFaculty: async (_, args) => {
            try {
                let faculty = await db.getFaculty(args.faculty)
                if (faculty.recordset[0]) {
                    await db.deleteFaculty(args.faculty)
                    return true
                } 

                return false
            } catch (e) {
                throw {
                    error: e.message,
                }
            }
        },
        delTeacher: async (_, args) => {
            try {
                let teacher = await db.getTeacher(args.teacher)
                if (teacher.recordset[0]) {
                    await db.deleteTeacher(args.teacher)
                    return true
                } 

                return false
            } catch (e) {
                throw {
                    error: e.message,
                }
            }
        },
        delPulpit: async (_, args) => {
            try {
                let pulpit = await db.getPulpit(args.pulpit)
                if (pulpit.recordset[0]) {
                    await db.deletePulpit(args.pulpit)
                    return true
                } 

                return false
            } catch (e) {
                throw {
                    error: e.message,
                }
            }
        },
        delSubject: async (_, args) => {
            try {
                let subject = await db.getSubject(args.subject)
                if (subject.recordset[0]) {
                    await db.deleteSubject(args.subject)
                    return true
                } 

                return false
            } catch (e) {
                throw {
                    error: e.message,
                }
            }
        },
    },
}

let schema = require('graphql-tools').makeExecutableSchema({
    typeDefs: fs.readFileSync('./schema.graphql').toString(),
    resolvers: rootValue,
})

http.createServer((req, res) => {
    let data = ''

    req.on('data', (chunk) => {
        data += chunk
    })

    req.on('end', () => {
        data = JSON.parse(data)
        res.setHeader('Content-Type', 'application/json')

        graphql({
            schema: schema,
            source: data.query,
            rootValue: undefined,
        })
            .then((response) => {
                res.end(JSON.stringify(response))
            })
            .catch((e) => {
                res.end(JSON.stringify(e))
            })
    })
}).listen(3000)
