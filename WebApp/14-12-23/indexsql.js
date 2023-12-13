const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'iot',
    waitForConncetions: true,
    connectionLimit: 10,
    queueLimit: 0
});


// Simple SELECT query
app.get('/', (req, res) => {
    pool.query('SELECT * FROM location', (error, results, fields) => {
        if(error) {
            console.error(error);
            res.status(500).send('Error retrieving data form the database'); 
        } else {
            res.json(results);
        }
    });
});


// Start the Express Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

