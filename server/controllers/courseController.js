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




exports.getCourseData = (req, res) => {
    // Implement logic to fetch course data from the database
    // Example using Mongoose:
    // Course.find({}, (err, courses) => {
    //   if (err) {
    //     return res.status(500).json({ error: 'Internal Server Error' });
    //   }
  
    //   return res.json(courses);
    // });
    const courses = [[
        { name: 'Web Design', progress: 80 },
        { name: 'Website Markup', progress: 72 },
        { name: 'One Page', progress: 89 },
        { name: 'Mobile Template', progress: 55 },
        
    
      ],
      [
        { name: 'Web Design', progress: 80 },
        { name: 'Website Markup', progress: 72 },
        { name: 'One Page', progress: 89 },
        { name: 'Mobile Template', progress: 55 },
        { name: 'Backend API', progress: 66 },
        { name: 'Backend API', progress: 66 }
    
      ]]
      ;
    

    return res.json(courses);
  };