const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const Teacher = sequelize.define('Teacher', {
        teacher: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        teacherName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    return Teacher
}
