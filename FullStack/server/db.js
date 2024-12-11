// Importing dependencies
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

// creating a pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSORD,
    database: process.env.DB_NAME
})

// exporting 
module.exports = pool.promise();