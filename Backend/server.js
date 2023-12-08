const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = 3002; // Change the port to 3001 to match the frontend

app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mayank125M',
  database: 'your_database_name', // Replace with your actual database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Body parser middleware
app.use(express.json());

// Sample route to handle GET requests
app.get('/', (req, res) => {
  res.send('Welcome to your Express server!');
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Query the database to retrieve user information
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      res.status(500).send('Internal Server Error');
    } else {
      if (results.length > 0) {
        // User found, compare passwords
        const user = results[0];

        bcrypt.compare(password, user.password, (bcryptErr, match) => {
          if (bcryptErr) {
            console.error('Error comparing passwords:', bcryptErr);
            res.status(500).send('Internal Server Error');
          } else {
            if (match) {
              res.status(200).json({ message: 'Login successful!' });
            } else {
              res.status(401).json({ message: 'Invalid credentials' });
            }
          }
        });
      } else {
        res.status(401).json({ message: 'User not found' });
      }
    }
  });
});

// Endpoint to register a new user
app.post('/api/signup', (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }
  
  // Hash the password before storing it in the database
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Error hashing the password:', err);
      res.status(500).send('Internal Server Error');
    } else {
      // Store user information in the database
      db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hash], (queryErr) => {
        if (queryErr) {
          console.error('Error inserting user into the database:', queryErr);
          res.status(500).send('Internal Server Error');
        } else {
          res.status(201).json({ message: 'User registered successfully!' });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
