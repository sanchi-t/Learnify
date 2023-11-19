const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EnrolledCourses = sequelize.define('EnrolledCourses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    masterCourseStatus: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    courses: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false,
    },
});

module.exports = EnrolledCourses;
