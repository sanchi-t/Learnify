const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/user-profile/:username', userController.getUserProfile);
router.post('/user-profile', userController.saveUserProfile);


module.exports = router;
