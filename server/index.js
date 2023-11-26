const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require("cors");
const courseRoutes = require('./routes/courseRoutes');
const dotenv = require('dotenv');





dotenv.config();
const app = express();

app.use(bodyParser.json());



app.use(cors());
// Define associations and sync the database
const User = require('./models/User');
User.sync();
const CompletedCourses = require('./models/CompletedCourses');
CompletedCourses.sync();
const EnrolledCourses = require('./models/EnrolledCourses');
EnrolledCourses.sync();
const Feedback = require('./models/Feedback');
Feedback.sync();
const MasterCourse = require('./models/MasterCourse');
MasterCourse.sync();
const DesignUdemy = require('./models/DesignUdemyModel');
DesignUdemy.sync();

app.use(authRoutes);
app.use(courseRoutes);
app.use(userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port 3000 ${process.env.POSTGRESQL_DB}`);
});


//To insert data from csv file----->
// const services = require('./controllers/serviceController');
// const csvFilePath = '../model/Design_Udemy.csv';
// services.insertDataFromCSV(csvFilePath)
