const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const AuditoriumType = sequelize.define('AuditoriumType', {
        auditoriumType: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        auditoriumTypeName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })

    return AuditoriumType
}
