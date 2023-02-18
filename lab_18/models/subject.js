const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const Subject = sequelize.define('Subject', {
        subject: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        subjectName: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    return Subject
}
