const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// DB Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'student-management-app'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

app.get('/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get('/students/:id', (req, res) => {
  db.query('SELECT * FROM students WHERE id = ?', [req.params.id], (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});

app.post('/students/add', (req, res) => {
  const { name, email, dob, stream, year } = req.body;
  db.query('INSERT INTO students SET ?', { name, email, dob, stream, year }, (err, result) => {
    if (err) throw err;
    res.send({ message: 'Student created', id: result.insertId });
  });
});

app.put('/students/edit/:id/', (req, res) => {
  const { name, email, dob, stream, year } = req.body;
  db.query('UPDATE students SET ? WHERE id = ?', [{ name, email, dob, stream, year }, req.params.id], (err) => {
    if (err) throw err;
    res.send({ message: 'Student updated' });
  });
});

app.delete('/students/delete/:id/', (req, res) => {
  db.query('DELETE FROM students WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.send({ message: 'Student deleted' });
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
