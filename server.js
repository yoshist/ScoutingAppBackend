require("dotenv").config();

const mysql = require('mysql2');
const fs = require('fs'); // To read the CA certificate

// Create a connection to the database using SSL (with CA certificate)
const db = mysql.createConnection({
    host: process.env.DB_HOST,        // DigitalOcean database IP/hostname
    user: process.env.DB_USER,        // MySQL user
    password: process.env.DB_PASSWORD, // MySQL password
    database: process.env.DB_NAME,    // MySQL database name
    port: process.env.DB_PORT, // Default MySQL port
    // ssl: {
    //     ca: fs.readFileSync('./ca-certificate.crt')  // Path to the CA certificate
    // }
});

// Connect to the database and handle any errors
db.connect(async (err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    } else {
        console.log('Connected to MySQL ' + process.env.DB_NAME + ' database!');
    }
});

// Export the db connection to be used in other files
module.exports = db;
