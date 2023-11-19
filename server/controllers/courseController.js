const { Op } = require('sequelize');
const DesignUdemy = require('../models/DesignUdemyModel');
const MasterCourse = require('../models/MasterCourse');
const EnrolledCourses = require('../models/EnrolledCourses');
const sequelize = require('../config/database')
const axios = require('axios');


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
    const { username } = req.params;
    try{
        const courses = await EnrolledCourses.findOne({
            where: { username: username },
        });
        return res.json(courses);
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
    

    
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


exports.addSelectCourse = async (req, res) => {
    const { assessmentAnswers,username } = req.body;
    try {
        // Retrieve the top 12 records from the table
        console.log('assesment',assessmentAnswers);

        const flaskApiUrl = 'http://127.0.0.1:5000';
         // Replace with your Flask API URL
        let courses = [];
        await axios.post(`${flaskApiUrl}/assessment`, { search_term: 'assessment', data: assessmentAnswers }).then(
          (response) => {
            courses = response.data;
            courses = courses.replace(/"course_id": NaN/g, '"course_id": 0');
            courses = JSON.parse(courses,true).result;
          } 
        );
        console.log(courses,'fghjk')
        const [masterCourse, created] = await MasterCourse.findOrCreate({
          where: { username: username },
          defaults: {
              recommendedCourses: courses
          }
      });

      // If the record already existed, update the recommendedCourses
      if (!created) {
          await masterCourse.update({
              recommendedCourses: courses
          });
      }



        // Respond with the found courses
        res.status(200).json({ message: 'success' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
};



exports.addCurrentCourse = async (req, res) => {
    const { course, username } = req.body;

    try {
        // Retrieve the user's enrolled courses
        let enrolledCourses = await EnrolledCourses.findOne({
            where: { username: username },
        });

        // If the user is enrolling for the first time, create a new record
        if (!enrolledCourses) {
            enrolledCourses = await EnrolledCourses.create({
                username: username,
                masterCourseStatus: 'incomplete',
                courses: [],
            });
        }

        // Add the current course to the user's enrolled courses
        const masterCourse = [];
        
        course.courses.map((ele)=>{
            let numberOfLectures = parseInt(ele.no_of_lectures, 10);
            if (isNaN(numberOfLectures) && numberOfLectures < 0){
                numberOfLectures = 1;
            }
            const newCourse = {
                course_title: ele.course_title,
                course_url: ele.title_url,
                lectures: Array.from({ length: numberOfLectures }, (_, i) => ({
                    status: 'pending',
                    title: `${ele.course_title} - Lecture ${i + 1}`,
                    notes: '',
                })),
            };
    
            masterCourse.push(newCourse);
            console.log(newCourse.lectures,ele.no_of_lectures,parseInt(ele.no_of_lectures, 10));

        })
        

        // Update the user's enrolled courses
        await enrolledCourses.update({
            courses: masterCourse,
        });

        res.status(200).json({ message: 'success' });

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
        console.log('select username course ',username);
        // const courses= [ [
        //     {
        //       title: 'Ultimate AWS Certified Solutions Architect Associate SAA-C03',
        //       items: 
        //         { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:392 },
        //         // Add more items as needed
              
        //     },
        //     {
        //         title: 'Ansible for the Absolute Beginner - Hands-On - DevOps',
        //         items: 
        //           { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:35 },
        //           // Add more items as needed
                
        //     },
        //     {
        //         title: 'Azure DevOps Fundamentals for Beginners',
        //         items: 
        //           { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:44 },
        //           // Add more items as needed
                
        //     },
        //     {
        //       title: 'Azure DevOps Fundamentals for Beginners',
        //       items: 
        //         { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:44 },
        //         // Add more items as needed
              
        //   },
        //   {
        //     title: 'Azure DevOps Fundamentals for Beginners',
        //     items: 
        //       { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:44 },
        //       // Add more items as needed
            
        // },
        //   ], [
        //     {
        //       title: 'Ultimate AWS Certified Solutions Architect Associate SAA-C03',
        //       items: 
        //         { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:392 },
        //         // Add more items as needed
              
        //     },
        //     {
        //         title: 'Ansible for the Absolute Beginner - Hands-On - DevOps',
        //         items: 
        //           { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:35 },
        //           // Add more items as needed
                
        //     },
        //     {
        //         title: 'Azure DevOps Fundamentals for Beginners',
        //         items: 
        //           { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:44 },
        //           // Add more items as needed
                
        //     },
        //   ], [
        //     {
        //       title: 'Ultimate AWS Certified Solutions Architect Associate SAA-C03',
        //       items: 
        //         { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:392 },
        //         // Add more items as needed
              
        //     },
        //     {
        //         title: 'Ansible for the Absolute Beginner - Hands-On - DevOps',
        //         items: 
        //           { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:35 },
        //           // Add more items as needed
                
        //     },
        //     {
        //         title: 'Azure DevOps Fundamentals for Beginners',
        //         items: 
        //           { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:44 },
        //           // Add more items as needed
                
        //     },
        //   ],
        //   [
        //     {
        //       title: 'Ultimate AWS Certified Solutions Architect Associate SAA-C03',
        //       items: 
        //         { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:392 },
        //         // Add more items as needed
              
        //     },
        //   ],
        //    [
        //     {
        //       title: 'Ultimate AWS Certified Solutions Architect Associate SAA-C03',
        //       items: 
        //         { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:392 },
        //         // Add more items as needed
              
        //     },
        //     {
        //         title: 'Ansible for the Absolute Beginner - Hands-On - DevOps',
        //         items: 
        //           { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:35 },
        //           // Add more items as needed
                
        //     },
        //     {
        //         title: 'Ansible for the Absolute Beginner - Hands-On - DevOps',
        //         items: 
        //           { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:35 },
        //           // Add more items as needed
                
        //     },
        //     {
        //         title: 'Azure DevOps Fundamentals for Beginners',
        //         items: 
        //           { status: 'Pending', link: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/', image:'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg', lectures:44 },
        //           // Add more items as needed
                
        //     },
        //   ]];


        const courses = await MasterCourse.findOne({ where: { username } });
        // Respond with the found courses
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
};
