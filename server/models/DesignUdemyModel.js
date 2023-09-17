const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Update the path accordingly

const DesignUdemy = sequelize.define('design_udemy', {
    course_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'course_id',
    },
    title: DataTypes.STRING,
    title_url: DataTypes.STRING,
    image: DataTypes.STRING,
    summary: DataTypes.STRING,
    rating: DataTypes.STRING,
    review: DataTypes.STRING,
    duration: DataTypes.STRING,
    no_of_lectures: DataTypes.STRING,
    level_course: DataTypes.STRING,
    author: DataTypes.STRING,
    course_card_rating: DataTypes.STRING,
    price: DataTypes.STRING,
}, {
    tableName: 'design_udemy',
    timestamps: false,
    underscored: true,
    hasPrimaryKeys: false,
});

module.exports = DesignUdemy;
