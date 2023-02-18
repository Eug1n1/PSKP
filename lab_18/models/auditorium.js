const { DataTypes, Op } = require('sequelize')

module.exports = (sequelize) => {
    const Auditorium = sequelize.define(
        'Auditorium',
        {
            auditorium: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            auditoriumName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            auditoriumCapacity: {
                type: DataTypes.NUMBER,
                allowNull: false,
            },
        },
        {
            scopes: {
                scoop: {
                    where: {
                        auditoriumCapacity: {
                            [Op.between]: [10, 60],
                        },
                    },
                },
            },
            tableName: 'Auditoriums',
        }
    )

    return Auditorium
}
