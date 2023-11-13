const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CompletedCourses = sequelize.define('CompletedCourses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    courses: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    }
});

module.exports = CompletedCourses;
