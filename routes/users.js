const express = require('express');
const db = require('../db'); // Import MySQL connection

const router = express.Router();

// GET: Fetch all users
router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json(results);
    });
});

// GET: Fetch a single user by ID
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(results[0]);
    });
});

// POST: Create a new user
router.post('/', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        res.status(201).json({ id: results.insertId, name, email });
    });
});

// PUT: Update a user
router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;

    db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, userId], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User updated successfully' });
    });
});

// DELETE: Delete a user
router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    
    db.query('DELETE FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    });
});

// Export the router to be used in `server.js`
module.exports = router;
