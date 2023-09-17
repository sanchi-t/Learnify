const express = require('express');
const courseController = require('../controllers/courseController');

const router = express.Router();

router.get('/courses', courseController.getCourse);
router.get('/recommend', courseController.getRecommendedCourse);

module.exports = router;
