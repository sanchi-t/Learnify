const express = require('express');
const courseController = require('../controllers/courseController');

const router = express.Router();

router.get('/courses', courseController.getCourse);
router.get('/recommend', courseController.getRecommendedCourse);
router.get('/course-data', courseController.getCourseData);
router.get('/current-course/:username', courseController.getCurrentCourse);
router.post('/current-course', courseController.addCurrentCourse);
router.delete('/current-course/:username', courseController.deleteCurrentCourse);
router.get('/select-course/:username', courseController.selectCurrentCourse);
router.post('/select-course', courseController.addSelectCourse);



module.exports = router;
