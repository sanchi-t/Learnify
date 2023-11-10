const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Completed_Courses = sequelize.define('Completed_Courses', {
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

module.exports = Completed_Courses;
