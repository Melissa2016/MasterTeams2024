require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to SQLite database
const db = new sqlite3.Database(process.env.DB_PATH, (err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the SQLite database.');

    // Create the `submissions` table if it doesn’t exist
    db.run(
      `CREATE TABLE IF NOT EXISTS submissions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          message TEXT NOT NULL,
          date TEXT NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error('Error creating table:', err);
        } else {
          console.log('Submissions table is ready.');
        }
      }
    );
  }
});

// Endpoint to handle form submissions
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;

  // Validate form data
  if (!name || !email || !message) {
    return res.status(400).send('All fields are required.');
  }

  // Insert data into the database
  const sql = `INSERT INTO submissions (name, email, message, date) VALUES (?, ?, ?, ?)`;
  const values = [name, email, message, new Date().toISOString()];

  db.run(sql, values, function (err) {
    if (err) {
      console.error('Error saving submission:', err);
      res.status(500).send('Server error. Please try again.');
    } else {
      console.log(`Submission saved with ID: ${this.lastID}`);
      res.status(200).send('Submission received! Thank you!');
    }
  });
});

// Endpoint to fetch all submissions
app.get('/submissions', (req, res) => {
  const sql = `SELECT * FROM submissions`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error fetching submissions:', err);
      res.status(500).send('Error fetching submissions');
    } else {
      res.status(200).json(rows); // Send the fetched rows as JSON
    }
  });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
