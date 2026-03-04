const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const { encrypt, decrypt } = require('./utils/encryption');

const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// MySQL connection
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD || "your_password",
  database: 'InfoSaver',
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
  connection.release();
});

// Get all entries
app.get('/api/entries', (req, res) => {
  db.query('SELECT dataId, domain, username, notes, created_at FROM LoginData ORDER BY created_at DESC', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.get('/api/entries/:id/password', (req, res)=>{
  console.log('grabbing password for entry ID:', req.params.id);

  db.query('SELECT pword from LoginData WHERE dataId = ?', [req.params.id], (err, results) => {
    if (err) {
      console.error('Error grabbing password:', err);
      res.status(500).json({ error: err.message });
    }

    if(results.length == 0){
      return res.status(404).json({ error: 'Entry Not Found' });
    }

    try{
      const encryptedPassword = results[0].pword;
      console.log('Encrypted password:', encryptedPassword.substring(0,20));

      const decryptedPassword = decrypt(encryptedPassword);
      console.log('Password successfully decrypted');
      res.json({ password: decryptedPassword });
    }
    catch(err){
      console.error('Decryption failed:', err);
      res.status(500).json({ error: 'Failed to decrypt password' });
    }
  })
})

// Add new entry
app.post('/api/entries', (req, res) => {
  const { domain, username, pword, notes } = req.body;

  if (!domain || !username || !pword) {
    return res.status(400).json({ error: 'Domain, username, and password are required' });
  }

  try {
    console.log('Original password:', pword);
    const encryptedPassword = encrypt(pword);
    console.log('Encrypted password:', encryptedPassword.substring(0,20) + '...');

    const query = 'INSERT INTO LoginData (domain, username, pword, notes) VALUES (?, ?, ?, ?)';
    db.query(query, [domain, username, encryptedPassword, notes || ''], (err, result) => {
      if (err) {
        res.status(500).json({error: err.message});
        return;
      }
      res.status(201).json({
        id: result.insertId,
        domain,
        username,
        notes
      });
    });
  }catch(err){
    console.error('Encryption error: ', err);
    res.status(500).json({ error: 'Failed to encrypt password' });
  }
});

// Update entry (password and notes only)
app.put('/api/entries/:id', (req, res) => {
  console.log(`✏️ Updating entry ID ${req.params.id}`);

  const { password, notes } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  try {
    // ENCRYPT the new password
    console.log('Encrypting new password...');
    const encryptedPassword = encrypt(password);

    const query = 'UPDATE LoginData SET pword = ?, notes = ? WHERE dataId = ?';

    db.query(
        query,
        [encryptedPassword, notes || '', req.params.id],
        (err, result) => {
          if (err) {
            console.error('❌ Error updating entry:', err);
            res.status(500).json({ error: err.message });
            return;
          }

          if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Entry not found' });
          }

          console.log(`✅ Entry ${req.params.id} updated (password encrypted)`);
          res.json({ message: 'Entry updated successfully' });
        }
    );
  } catch (error) {
    console.error('❌ Encryption error:', error);
    res.status(500).json({ error: 'Failed to encrypt password' });
  }
});

// Delete entry
app.delete('/api/entries/:id', (req, res) => {
  db.query('DELETE FROM LoginData WHERE dataId = ?', [req.params.id], (err, result) => {
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