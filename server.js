const express = require('express');
const mysql = require('mysql2');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());

// Serve your HTML/CSS/JS files from your current folder
app.use(express.static(path.join(__dirname)));

// MySQL Connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
port: process.env.DB_PORT || 3306
});

db.connect((err) => {
if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
 }
console.log('Connected to MySQL Database!');
});

// Example route
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'index.html'));
});

// Use the port Render provides, or 3000 locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});