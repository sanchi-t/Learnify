const { Sequelize } = require('sequelize');
const dbConfig = require("./db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: false
  // declaring pool is optional
  // pool: {
//   max: dbConfig.pool.max,
//   min: dbConfig.pool.min,
//   acquire: dbConfig.pool.acquire,
//   idle: dbConfig.pool.idle
// }
});

module.exports = sequelize;
