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
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: false,
    }
});

module.exports = MasterCourse;
