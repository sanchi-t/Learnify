const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EnrolledCourses = sequelize.define('EnrolledCourses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    course: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    courseDetails: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
    }
});

module.exports = EnrolledCourses;
