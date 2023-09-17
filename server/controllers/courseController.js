const { Op } = require('sequelize');
const DesignUdemy = require('../models/DesignUdemyModel');
const sequelize = require('../config/database')


exports.getCourse = async (req, res) => {
    const { courseName } = req.query;

    try {
        // Search for courses where the title contains the courseName
        const courses = await DesignUdemy.findAll({
            where: {
                title: {
                    [Op.iLike]: `%${courseName}%`, // Use ILIKE for case-insensitive search
                },
            },
        });

        // Respond with the found courses
        res.json({ courses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
};


exports.getRecommendedCourse = async (req, res) => {
    try {
        // Retrieve the top 12 records from the table
        const courses = await DesignUdemy.findAll({
            order: sequelize.literal('random()'),
            limit: 12,
        });

        // Respond with the found courses
        res.json({ courses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
};
