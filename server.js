require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import route files
const matchDataRoutes = require('./routes/matchData'); // Import match data route

// Import the API routes
// const usersRoutes = require('./routes/users');
// app.use('/api/users', usersRoutes); // Use the users route
app.use('/api/match-data', matchDataRoutes); // Register match data route

// Start server
const PORT = process.env.DB_PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});