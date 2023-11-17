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



exports.getCurrentCourse = async (req, res) => {
    const courses = [
        {
          title: 'Ultimate AWS Certified Solutions Architect Associate SAA-C03',
          items: 
            { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:392 },
            // Add more items as needed
          
        },
        {
            title: 'Ansible for the Absolute Beginner - Hands-On - DevOps',
            items: 
              { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:35 },
              // Add more items as needed
            
        },
        {
            title: 'Azure DevOps Fundamentals for Beginners',
            items: 
              { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:44 },
              // Add more items as needed
            
        },
      ];
    

    return res.json(courses);
};



exports.getCourseData = (req, res) => {

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


exports.addCurrentCourse = async (req, res) => {
    const { assessmentAnswers } = req.body;
    try {
        // Retrieve the top 12 records from the table
        console.log('assesment',assessmentAnswers);

        // Respond with the found courses
        res.json({ assessmentAnswers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
};

exports.deleteCurrentCourse = async (req, res) => {
    const { username } = req.params;
    try {
        // Retrieve the top 12 records from the table
        console.log('delete username course ',username);

        // Respond with the found courses
        res.json({ username });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
};


exports.selectCurrentCourse = async (req, res) => {
    const { username } = req.params;
    try {
        // Retrieve the top 12 records from the table
        console.log('delete username course ',username);
        const courses= [ [
            {
              title: 'Ultimate AWS Certified Solutions Architect Associate SAA-C03',
              items: 
                { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:392 },
                // Add more items as needed
              
            },
            {
                title: 'Ansible for the Absolute Beginner - Hands-On - DevOps',
                items: 
                  { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:35 },
                  // Add more items as needed
                
            },
            {
                title: 'Azure DevOps Fundamentals for Beginners',
                items: 
                  { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:44 },
                  // Add more items as needed
                
            },
            {
              title: 'Azure DevOps Fundamentals for Beginners',
              items: 
                { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:44 },
                // Add more items as needed
              
          },
          {
            title: 'Azure DevOps Fundamentals for Beginners',
            items: 
              { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:44 },
              // Add more items as needed
            
        },
          ], [
            {
              title: 'Ultimate AWS Certified Solutions Architect Associate SAA-C03',
              items: 
                { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:392 },
                // Add more items as needed
              
            },
            {
                title: 'Ansible for the Absolute Beginner - Hands-On - DevOps',
                items: 
                  { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:35 },
                  // Add more items as needed
                
            },
            {
                title: 'Azure DevOps Fundamentals for Beginners',
                items: 
                  { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:44 },
                  // Add more items as needed
                
            },
          ], [
            {
              title: 'Ultimate AWS Certified Solutions Architect Associate SAA-C03',
              items: 
                { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:392 },
                // Add more items as needed
              
            },
            {
                title: 'Ansible for the Absolute Beginner - Hands-On - DevOps',
                items: 
                  { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:35 },
                  // Add more items as needed
                
            },
            {
                title: 'Azure DevOps Fundamentals for Beginners',
                items: 
                  { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:44 },
                  // Add more items as needed
                
            },
          ],
          [
            {
              title: 'Ultimate AWS Certified Solutions Architect Associate SAA-C03',
              items: 
                { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:392 },
                // Add more items as needed
              
            },
          ],
           [
            {
              title: 'Ultimate AWS Certified Solutions Architect Associate SAA-C03',
              items: 
                { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:392 },
                // Add more items as needed
              
            },
            {
                title: 'Ansible for the Absolute Beginner - Hands-On - DevOps',
                items: 
                  { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:35 },
                  // Add more items as needed
                
            },
            {
                title: 'Ansible for the Absolute Beginner - Hands-On - DevOps',
                items: 
                  { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:35 },
                  // Add more items as needed
                
            },
            {
                title: 'Azure DevOps Fundamentals for Beginners',
                items: 
                  { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:44 },
                  // Add more items as needed
                
            },
          ]];
        // Respond with the found courses
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
};
