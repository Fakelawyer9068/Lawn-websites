const express = require('express');
const mysql = require('mysql');

const app = express();

app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'fakelawyer',
  password: 'Copper15%',
  database: 'inquiries',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

app.post('/submit-inquiry', (req, res) => {
  console.log('Inquiry submitted');

  const { lawnSize, day, address, phone, totalPrice } = req.body;

  const sql =
    'INSERT INTO inquiries (lawnSize, day, address, phone, totalPrice) VALUES (?, ?, ?, ?, ?)';
  db.query(
    sql,
    [lawnSize, day, address, phone, totalPrice],
    (err, result) => {
      if (err) {
        console.error('Error storing inquiry:', err);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        console.log('Inquiry stored successfully');
        res.status(200).json({ message: 'Inquiry stored successfully' });
      }
    }
  );
});

// Add the route to retrieve inquiries
app.get('/get-inquiries', (req, res) => {
  const sql = 'SELECT * FROM inquiries';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving inquiries:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      console.log('Inquiries retrieved successfully');
      res.status(200).json(results);
    }
  });
});

// Add a route to delete inquiries
app.delete('/delete-inquiry/:id', (req, res) => {
  const inquiryId = req.params.id;

  const sql = 'DELETE FROM inquiries WHERE id = ?';
  db.query(sql, [inquiryId], (err, result) => {
    if (err) {
      console.error('Error deleting inquiry:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      console.log('Inquiry deleted successfully');
      res.status(200).json({ message: 'Inquiry deleted successfully' });
    }
  });
});

// Serve static files from the 'front' directory
app.use(express.static('C:/Users/Fake_lawyer012/Desktop/Price clac/front'));

// Define a route to serve the inquiries HTML page
app.get('/inquiries', (req, res) => {
  res.sendFile('C:/Users/Fake_lawyer012/Desktop/Price clac/front/inquiries.html');
});

const PORT = process.env.PORT || 3011;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
