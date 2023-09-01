const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const cors = require("cors");



const app = express();

app.use(bodyParser.json());



app.use(cors());
// Define associations and sync the database
const User = require('./models/User');
User.sync();

app.use(authRoutes);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
