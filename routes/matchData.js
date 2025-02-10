const express = require('express');
const db = require('../db'); // Import MySQL connection

const router = express.Router();

// GET: Fetch all match data for a specific team
router.get('/:team_number', (req, res) => {
    const teamNumber = req.params.team_number;

    db.query('SELECT * FROM match_data WHERE team_number = ?', [teamNumber], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        
        console.log('Query Results:', results); // Log query results to the console

        if (results.length === 0) {
            return res.status(404).json({ message: 'No match data found for this team' });
        }
        
        res.json(results);
        console.log(results);
    });
});

// Export the router
module.exports = router;
