const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const Faculty = sequelize.define(
        'Faculty',
        {
            faculty: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            facultyName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            hooks: {
                beforeCreate: (faculty, options) => {
                    console.log(
                        `before: ${JSON.stringify(faculty, null, '\t')}`
                    )
                },
                afterCreate: (faculty, options) => {
                    console.log(
                        `after: ${JSON.stringify(faculty, null, '\t')}`
                    )
                },
            },
        }
    )

    return Faculty
}
