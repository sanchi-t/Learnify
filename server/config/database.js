const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Learnify', 'postgres', 'Smriti1462', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

module.exports = sequelize;
