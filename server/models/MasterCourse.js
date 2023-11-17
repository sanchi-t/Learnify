const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MasterCourse = sequelize.define('MasterCourse', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    recommendedCourses: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
    }
});

module.exports = MasterCourse;
