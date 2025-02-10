// config/db.js
const mysql = require('mysql2'); // Import the mysql2 package

// Create a connection to the database using credentials from environment variables
const db = mysql.createConnection({
    host: process.env.DB_HOST,       // DigitalOcean database host
    user: process.env.DB_USER,       // MySQL user
    password: process.env.DB_PASSWORD, // MySQL password
    database: process.env.DB_NAME    // MySQL database name
});

// Connect to the database and handle any errors
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1);  // Exit the process if the connection fails
    } else {
        console.log("Connected to MySQL database!");
    }
});

// Export the db connection to be used in other files
module.exports = db;
