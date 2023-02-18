const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const Pulpit = sequelize.define('Pulpit', {
        pulpit: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        pulpitName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    return Pulpit
}
