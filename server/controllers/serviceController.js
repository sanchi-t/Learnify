const fs = require('fs');
const csvParser = require('csv-parser');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');



// Define your Sequelize model to match the table structure
const DesignUdemy = sequelize.define('design_udemy', {
    course_id: {
        type: DataTypes.INTEGER,
        primaryKey: true, // Specify this as the primary key
        autoIncrement: true, // Enable auto-increment
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
    tableName: 'design_udemy', // Specify the custom table name here
    timestamps: false,
    underscored: true,
});


function truncateString(inputString, maxLength) {
    if (inputString.length <= maxLength) {
        return inputString;
    } else {
        return inputString.slice(0, maxLength);
    }
}



exports.insertDataFromCSV = async (filePath) => {
    try {
        const stream = fs.createReadStream(filePath);
        stream.pipe(csvParser())
            .on('data', async (row) => {
                // Insert a new record using Sequelize's model
                await DesignUdemy.create({
                    title: truncateString(row.title,255),
                    title_url: row.title_url,
                    image: row.image,
                    summary: truncateString(row.summary, 255),
                    rating: row.rating,
                    review: row.review,
                    duration: row.duration,
                    no_of_lectures: row.no_of_lectures,
                    level_course: row.level_course,
                    author: row.author,
                    course_card_rating: row.course_card_rating,
                    price: row.price,
                });
            })
            .on('end', () => {
                console.log('CSV data has been inserted into the database.');
            });
    } catch (error) {
        console.error('Error inserting data:', error);
    }
};

// Sync the Sequelize model with the database schema
(async () => {
    try {
        await sequelize.sync();
    } catch (error) {
        console.error('Error syncing the database:', error);
    }
})();
