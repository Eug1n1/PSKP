const DB = require('./DB')
const db = new DB()

module.exports = {
    Faculty: {
        pulpits: async (args) => {
            let pulpits = await db.getPulpitsByFaculty(args.faculty)

            return pulpits.recordset
        },
    },
    Pulpit: {
        faculty: async (args) => {
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
        getFaculties: async (_, args, context) => {
            if (args.faculty) {
                let faculty = await db.getFaculty(args.faculty)

                return faculty.recordset
            }

            console.log(context)
            let faculties = (await db.getFaculties()).recordset

            return faculties
        },
        getTeachers: async (_, args) => {
            if (args.teacher) {
                let teacher = await db.getTeacher(args.teacher)

                return teacher.recordset
            }

            let teachers = (await db.getTeachers()).recordset

            return teachers
        },
        getPulpits: async (_, args) => {
            if (args.pulpit) {
                let pulpit = await db.getPulpit(args.pulpit)

                return pulpit.recordset
            }

            let pulpits = (await db.getPulpits()).recordset

            return pulpits
        },
        getSubjects: async (_, args) => {
            if (args.subject) {
                let subject = await db.getSubject(args.subject)

                return subject.recordset
            }

            let subjects = (await db.getSubjects()).recordset

            return subjects
        },
        getTeachersByFaculty: async (_, args) => {
            let teachers = await db.getTeachersByFaculty(args.faculty)

            return teachers.recordset
        },
        getSubjectsByFaculty: async (_, args) => {
            let subjects = await db.getSubjectsByFaculty(args.faculty)

            return subjects.recordset
        },
    },
    Mutation: {
        setFaculty: async (_, args) => {
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
        },
        setTeacher: async (_, args) => {
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
        },
        setPulpit: async (_, args) => {
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
        },
        setSubject: async (_, args) => {
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
        },
        delFaculty: async (_, args) => {
            let faculty = await db.getFaculty(args.faculty)
            if (faculty.recordset[0]) {
                await db.deleteFaculty(args.faculty)
                return true
            }

            return false
        },
        delTeacher: async (_, args) => {
            let teacher = await db.getTeacher(args.teacher)
            if (teacher.recordset[0]) {
                await db.deleteTeacher(args.teacher)
                return true
            }

            return false
        },
        delPulpit: async (_, args) => {
            let pulpit = await db.getPulpit(args.pulpit)
            if (pulpit.recordset[0]) {
                await db.deletePulpit(args.pulpit)
                return true
            }

            return false
        },
        delSubject: async (_, args) => {
            let subject = await db.getSubject(args.subject)
            if (subject.recordset[0]) {
                await db.deleteSubject(args.subject)
                return true
            }

            return false
        },
    },
}
