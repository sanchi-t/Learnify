const { Op } = require('sequelize');
const DesignUdemy = require('../models/DesignUdemyModel');
const MasterCourse = require('../models/MasterCourse');
const EnrolledCourses = require('../models/EnrolledCourses');
const sequelize = require('../config/database')
const axios = require('axios');
const CompletedCourses = require('../models/CompletedCourses');
const User = require('../models/User');




exports.getCourse = async (req, res) => {
    const { courseName } = req.query;

    try {
        let courses;

        // Check if the courseName is specifically 'AI'
        if (courseName.toUpperCase() === 'AI') {
            courses = await DesignUdemy.findAll({
                where: {
                    title: {
                        [Op.iRegexp]: `\\m${courseName}\\M`, // \\m and \\M represent word boundaries
                    },
                },
            });
        } else {
            // For other cases, use a case-insensitive search with ILIKE
            courses = await DesignUdemy.findAll({
                where: {
                    title: {
                        [Op.iLike]: `%${courseName}%`, // Use ILIKE for case-insensitive search
                    },
                },
            });
        }

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



exports.getCourseData = async (req, res) => {
    const {username} = req.body;
    const courses = await CompletedCourses.findOne({
        where: { username: username },
    });
    
    return res.json(courses);
  };


exports.addSelectCourse = async (req, res) => {
    const { assessmentAnswers,username } = req.body;
    try {
        // Retrieve the top 12 records from the table
        const flaskApiUrl = process.env.MODEL_API;
         // Replace with your Flask API URL
         console.log(flaskApiUrl)
        let courses = [];
        await axios.post(`${flaskApiUrl}/assessment`, { search_term: 'assessment', data: assessmentAnswers }).then(
          (response) => {
            courses = response.data;
            courses = courses.replace(/NaN/g, '0');
            console.log(courses,'fghjk')
            courses = JSON.parse(courses,true).result;
          } 
        );
        
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
        console.log(error);
        res.status(500).json({ message: error });
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
        await EnrolledCourses.destroy({ where: { username } });
        // Respond with the found courses
        res.json({ username });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
};

exports.editCurrentCourse = async (req, res) => {
    const { username, updatedLecture } = req.body;

    try {
        // Retrieve the user's enrolled courses
        let enrolledCourses = await EnrolledCourses.findOne({
            where: { username: username },
        });

        if (!enrolledCourses) {
            // Handle the case where the user is not found or not enrolled in any courses
            res.status(404).json({ message: 'User not found or not enrolled in any courses' });
            return;
        }

        // Update the status and notes of the specified lecture
        const updatedCourses = enrolledCourses.courses.map((course) => {
            const updatedLectures = course.lectures.map((lecture) => {
                if (lecture.title === updatedLecture.title) {
                    // Update the lecture information
                    return {
                        ...lecture,
                        status: updatedLecture.status,
                        notes: updatedLecture.notes,
                    };
                }
                return lecture;
            });

            return {
                ...course,
                lectures: updatedLectures,
            };
        });

        // Update the user's enrolled courses
        await enrolledCourses.update({
            courses: updatedCourses,
        });

        res.status(200).json({ message: 'success' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
};


exports.completedCurrentCourse = async (req, res) => {
    const { username, course } = req.body;
    try {
        // Retrieve the user's completed courses
        let completedCourses = await CompletedCourses.findOne({
            where: { username: username },
        });

        if (!completedCourses) {
            // If the user has no completed courses, create a new record
            completedCourses = await CompletedCourses.create({
                username: username,
                courses: [],
            });
        }

        // Push the new course into the courses array
        (completedCourses.courses).push(course);

        

        // Update the completedCourses with the modified courses array
        await CompletedCourses.update(
            {courses: completedCourses.courses},
            {where : {username: username}}
        );


        completedCourses = await CompletedCourses.findOne({
            where: { username: username },
        });

        await User.increment(
            'completedNo',
            {
              by: 1,
              where: { username: username },
            }
          );
          
        await EnrolledCourses.destroy({ where: { username } });

        res.status(200).json({ message: 'success' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
};


exports.selectCurrentCourse = async (req, res) => {
    const { username } = req.params;
    try {
        console.log('select username course ',username);
        const courses = await MasterCourse.findOne({ where: { username } });
        // Respond with the found courses
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
};
