const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    HOST: process.env.POSTGRESQL_DB_HOST,
    USER: process.env.POSTGRESQL_DB_USER,
    PASSWORD: process.env.POSTGRESQL_DB_PASSWORD,
    DB: process.env.POSTGRESQL_DB,
    dialect: "postgres",
    port: 5432, 
    // declaring pool is optional
    // pool: {
  //   max: 5,
  //   min: 0,
  //   acquire: 30000,
  //   idle: 10000
  // }
  };