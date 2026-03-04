const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "your_password",
  database: 'InfoSaver'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Get all entries
app.get('/api/entries', (req, res) => {
  db.query('SELECT * FROM LoginData ORDER BY created_at DESC', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// Add new entry
app.post('/api/entries', (req, res) => {
  const { domain, username, password, notes } = req.body;
  
  if (!domain || !username || !password) {
    return res.status(400).json({ error: 'Domain, username, and password are required' });
  }

  const query = 'INSERT INTO LoginData (domain, username, password, notes) VALUES (?, ?, ?, ?)';
  db.query(query, [domain, username, password, notes || ''], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({
      id: result.insertId,
      domain,
      username,
      password,
      notes
    });
  });
});

// Update entry (password and notes only)
app.put('/api/entries/:id', (req, res) => {
  const { password, notes } = req.body;
  const query = 'UPDATE LoginData SET password = ?, notes = ? WHERE id = ?';
  
  db.query(query, [password, notes, req.params.id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Entry updated successfully' });
  });
});

// Delete entry
app.delete('/api/entries/:id', (req, res) => {
  db.query('DELETE FROM LoginData WHERE id = ?', [req.params.id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Entry deleted successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});