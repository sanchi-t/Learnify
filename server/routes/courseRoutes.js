const express = require('express');
const courseController = require('../controllers/courseController');

const router = express.Router();

router.get('/courses', courseController.getCourse);
router.get('/recommend', courseController.getRecommendedCourse);
router.get('/course-data', courseController.getCourseData);
router.get('/current-course', courseController.getCurrentCourse);

module.exports = router;
