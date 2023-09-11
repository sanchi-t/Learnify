const express = require('express');
const courseController = require('../controllers/courseController');

const router = express.Router();

router.get('/courses', courseController.getCourse);

module.exports = router;
