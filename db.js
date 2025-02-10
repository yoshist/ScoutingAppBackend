require("dotenv").config();

const mysql = require('mysql2');
const fs = require('fs');

console.log(process.env.DB_NAME);
console.log(process.env.DB_HOST);

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    } else {
        console.log('Connected to MySQL database with!');
    }
});

module.exports = db;
