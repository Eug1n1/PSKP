const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    define: {
        hooks: {
            beforeDestroy() {
                console.log(`beforeDestroy`)
            },
        },
        timestamps: false,
    },
    pool: {
        max: 5,
        min: 0,
    },
})

const Faculty = require('./faculty')(sequelize)
const Pulpit = require('./pulpit')(sequelize)
const Subject = require('./subject')(sequelize)
const Teacher = require('./teacher')(sequelize)
const Auditorium = require('./auditorium')(sequelize)
const AuditoriumType = require('./auditorium_type')(sequelize)

Faculty.hasMany(Pulpit, {
    foreignKey: 'faculty',
    sourceKey: 'faculty',
})

Pulpit.hasMany(Subject, {
    foreignKey: 'pulpit',
    sourceKey: 'pulpit',
})

Pulpit.hasMany(Teacher, {
    foreignKey: 'pulpit',
    sourceKey: 'pulpit',
})

AuditoriumType.hasMany(Auditorium, {
    foreignKey: 'auditoriumType',
    sourceKey: 'auditoriumType',
})

module.exports = {
    Faculty,
    Pulpit,
    Subject,
    Teacher,
    Auditorium,
    AuditoriumType,
    sequelize,
}
