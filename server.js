const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employeeform',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Create table if not exists
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS employee_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    loginTime VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    mobileNumber VARCHAR(255) NOT NULL,
    logoutTime VARCHAR(255),
    sessionType VARCHAR(255),
    morningTask TEXT,
    afternoonTask TEXT,
    suggestionBox TEXT
  )
`;

db.query(createTableQuery, (err, result) => {
  if (err) {
    console.error('Error creating table:', err);
    return;
  }
  console.log('Table created or already exists');
});

// Endpoint to handle employee login form submission
app.post('/submit-login', (req, res) => {
  const { date, loginTime, name, mobileNumber } = req.body;

  const sql = 'INSERT INTO employee_table (date, loginTime, name, mobileNumber) VALUES (?, ?, ?, ?)';
  db.query(sql, [date, loginTime, name, mobileNumber], (err, result) => {
    if (err) {
      console.error('Error inserting employee login data:', err);
      res.status(500).json({ message: 'Error' });
    } else {
      console.log('Employee login data inserted successfully');
      res.status(200).json({ message: 'Form submitted successfully!' });
    }
  });
});

// Endpoint to fetch all employee login data
app.get('/employee-logins', (req, res) => {
  const sql = 'SELECT * FROM employee_table';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching employee login data:', err);
      res.status(500).json({ message: 'Error' });
    } else {
      console.log('Employee login data fetched successfully');
      res.status(200).json(result);
    }
  });
});

// Endpoint to handle employee logout form submission
app.post('/submit-logout', (req, res) => {
  const { date, logoutTime, name, mobileNumber, sessionType, morningTask, afternoonTask, suggestionBox } = req.body;

  const sql = 'UPDATE employee_table SET logoutTime = ?, sessionType = ?, morningTask = ?, afternoonTask = ?, suggestionBox = ? WHERE date = ? AND name = ? AND mobileNumber = ?';
  db.query(sql, [logoutTime, sessionType, morningTask, afternoonTask, suggestionBox, date, name, mobileNumber], (err, result) => {
    if (err) {
      console.error('Error updating employee logout data:', err);
      res.status(500).json({ message: 'Error' });
    } else {
      console.log('Employee logout data updated successfully');
      res.status(200).json({ message: 'Logout form submitted successfully!' });
    }
  });
});


module.exports = app;




// const express = require('express');
// const mysql = require('mysql');
// const cors = require('cors');
// const path = require('path');
// const bcrypt = require('bcryptjs'); // For password hashing

// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use(express.static(path.join(__dirname, '../public')));

// // Start server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // Set up MySQL connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'employeeform',
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to database:', err);
//     return;
//   }
//   console.log('Connected to MySQL database');
// });

// // Create table if not exists
// const createTableQuery = `
//   CREATE TABLE IF NOT EXISTS employee_table (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     email VARCHAR(255) NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     employeeId VARCHAR(255) NOT NULL,
//     mobileNumber VARCHAR(255) NOT NULL
//   )
// `;

// const createLogTableQuery = `
//   CREATE TABLE IF NOT EXISTS employee_logins (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     date DATE NOT NULL,
//     loginTime VARCHAR(255) NOT NULL,
//     name VARCHAR(255) NOT NULL,
//     mobileNumber VARCHAR(255) NOT NULL,
//     logoutTime VARCHAR(255),
//     sessionType VARCHAR(255),
//     morningTask TEXT,
//     afternoonTask TEXT,
//     suggestionBox TEXT
//   )
// `;

// db.query(createTableQuery, (err) => {
//   if (err) {
//     console.error('Error creating employee table:', err);
//     return;
//   }
//   console.log('Employee table created or already exists');
// });

// db.query(createLogTableQuery, (err) => {
//   if (err) {
//     console.error('Error creating employee login table:', err);
//     return;
//   }
//   console.log('Employee login table created or already exists');
// });

// // ===================== Registration Endpoint =====================
// app.post('/submit-registration', (req, res) => {
//   const { name, email, password, employeeId, mobileNumber } = req.body;

//   // Basic validation
//   if (!name || !email || !password || !employeeId || !mobileNumber) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   // Validate if email is already registered
//   const checkEmailQuery = 'SELECT * FROM employee_table WHERE email = ?';
//   db.query(checkEmailQuery, [email], (err, result) => {
//     if (err) {
//       console.error('Error checking email:', err);
//       return res.status(500).json({ message: 'Error checking email' });
//     }
//     if (result.length > 0) {
//       return res.status(400).json({ message: 'Email is already registered' });
//     }

//     // Hash the password before storing it in the database
//     bcrypt.hash(password, 10, (err, hashedPassword) => {
//       if (err) {
//         console.error('Error hashing password:', err);
//         return res.status(500).json({ message: 'Error hashing password' });
//       }

//       // Insert new employee data into the database
//       const sql = 'INSERT INTO employee_table (name, email, password, employeeId, mobileNumber) VALUES (?, ?, ?, ?, ?)';
//       db.query(sql, [name, email, hashedPassword, employeeId, mobileNumber], (err, result) => {
//         if (err) {
//           console.error('Error inserting employee data:', err);
//           return res.status(500).json({ message: 'Error inserting data' });
//         }
//         console.log('Employee data inserted successfully');
//         res.status(200).json({ message: 'Registration successful!' });
//       });
//     });
//   });
// });

// // ===================== Login Endpoint =====================
// app.post('/submit-login', (req, res) => {
//   const { date, loginTime, name, mobileNumber } = req.body;

//   if (!date || !loginTime || !name || !mobileNumber) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   const sql = 'INSERT INTO employee_logins (date, loginTime, name, mobileNumber) VALUES (?, ?, ?, ?)';
//   db.query(sql, [date, loginTime, name, mobileNumber], (err, result) => {
//     if (err) {
//       console.error('Error inserting employee login data:', err);
//       return res.status(500).json({ message: 'Error' });
//     }
//     console.log('Employee login data inserted successfully');
//     res.status(200).json({ message: 'Login data submitted successfully!' });
//   });
// });

// // ===================== Fetch Employee Logins Endpoint =====================
// app.get('/employee-logins', (req, res) => {
//   const sql = 'SELECT * FROM employee_logins';
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.error('Error fetching employee login data:', err);
//       return res.status(500).json({ message: 'Error fetching data' });
//     }
//     res.status(200).json(result);
//   });
// });

// // ===================== Logout Endpoint =====================
// app.post('/submit-logout', (req, res) => {
//   const { date, logoutTime, name, mobileNumber, sessionType, morningTask, afternoonTask, suggestionBox } = req.body;

//   if (!date || !logoutTime || !name || !mobileNumber) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   const sql = `
//     UPDATE employee_logins 
//     SET logoutTime = ?, sessionType = ?, morningTask = ?, afternoonTask = ?, suggestionBox = ? 
//     WHERE date = ? AND name = ? AND mobileNumber = ?
//   `;
//   db.query(sql, [logoutTime, sessionType, morningTask, afternoonTask, suggestionBox, date, name, mobileNumber], (err, result) => {
//     if (err) {
//       console.error('Error updating employee logout data:', err);
//       return res.status(500).json({ message: 'Error updating data' });
//     }
//     console.log('Employee logout data updated successfully');
//     res.status(200).json({ message: 'Logout data submitted successfully!' });
//   });
// });

// module.exports = app;








// const express = require('express');
// const mysql = require('mysql');
// const cors = require('cors');
// const path = require('path');
// const bcrypt = require('bcryptjs'); // For password hashing

// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use(express.static(path.join(__dirname, '../public')));

// // Start server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // Set up MySQL connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'employeeform',
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to database:', err);
//     return;
//   }
//   console.log('Connected to MySQL database');
// });

// // Create a single unified table if it doesn't already exist
// const createTableQuery = `
//   CREATE TABLE IF NOT EXISTS employee_data (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     employeeId VARCHAR(255) NOT NULL,
//     mobileNumber VARCHAR(255) NOT NULL,
//     date DATE NOT NULL,
//     loginTime VARCHAR(255),
//     logoutTime VARCHAR(255),
//     sessionType VARCHAR(255),
//     morningTask TEXT,
//     afternoonTask TEXT,
//     suggestionBox TEXT
//   )
// `;

// db.query(createTableQuery, (err) => {
//   if (err) {
//     console.error('Error creating unified table:', err);
//     return;
//   }
//   console.log('Unified table created or already exists');
// });

// // ===================== Registration Endpoint =====================
// app.post('/submit-registration', (req, res) => {
//   const { name, email, password, employeeId, mobileNumber } = req.body;

//   if (!name || !email || !password || !employeeId || !mobileNumber) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   const checkEmailQuery = 'SELECT * FROM employee_data WHERE email = ?';
//   db.query(checkEmailQuery, [email], (err, result) => {
//     if (err) {
//       console.error('Error checking email:', err);
//       return res.status(500).json({ message: 'Error checking email' });
//     }
//     if (result.length > 0) {
//       return res.status(400).json({ message: 'Email is already registered' });
//     }

//     bcrypt.hash(password, 10, (err, hashedPassword) => {
//       if (err) {
//         console.error('Error hashing password:', err);
//         return res.status(500).json({ message: 'Error hashing password' });
//       }

//       const sql = 'INSERT INTO employee_data (name, email, password, employeeId, mobileNumber) VALUES (?, ?, ?, ?, ?)';
//       db.query(sql, [name, email, hashedPassword, employeeId, mobileNumber], (err) => {
//         if (err) {
//           console.error('Error inserting registration data:', err);
//           return res.status(500).json({ message: 'Error inserting data' });
//         }
//         res.status(200).json({ message: 'Registration successful!' });
//       });
//     });
//   });
// });

// // ===================== Login Endpoint =====================
// app.post('/submit-login', (req, res) => {
//   const { date, loginTime, name, mobileNumber } = req.body;

//   if (!date || !loginTime || !name || !mobileNumber) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   const sql = `
//     INSERT INTO employee_data (date, loginTime, name, mobileNumber)
//     VALUES (?, ?, ?, ?)
//     ON DUPLICATE KEY UPDATE loginTime = VALUES(loginTime)
//   `;

//   db.query(sql, [date, loginTime, name, mobileNumber], (err, result) => {
//     if (err) {
//       console.error('Error updating login data:', err);
//       return res.status(500).json({ message: 'Error updating login data' });
//     }

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({ message: 'Login recorded successfully!' });
//   });
// });

// // ===================== Logout Endpoint =====================
// app.post('/submit-logout', (req, res) => {
//   const { date, logoutTime, name, mobileNumber, sessionType, morningTask, afternoonTask, suggestionBox } = req.body;

//   if (!date || !logoutTime || !name || !mobileNumber) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   const sql = `
//     UPDATE employee_data
//     SET logoutTime = ?, sessionType = ?, morningTask = ?, afternoonTask = ?, suggestionBox = ?
//     WHERE date = ? AND name = ? AND mobileNumber = ?
//   `;

//   db.query(sql, [logoutTime, sessionType, morningTask, afternoonTask, suggestionBox, date, name, mobileNumber], (err, result) => {
//     if (err) {
//       console.error('Error updating logout data:', err);
//       return res.status(500).json({ message: 'Error updating logout data' });
//     }

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'No matching login record found' });
//     }

//     res.status(200).json({ message: 'Logout recorded successfully!' });
//   });
// });

// // ===================== Fetch All Data Endpoint =====================
// app.get('/employee-data', (req, res) => {
//   const sql = 'SELECT * FROM employee_data';
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.error('Error fetching employee data:', err);
//       return res.status(500).json({ message: 'Error fetching data' });
//     }
//     res.status(200).json(result);
//   });
// });

// module.exports = app;




// const express = require('express');
// const mysql = require('mysql');
// const cors = require('cors');
// const path = require('path');
// const bcrypt = require('bcryptjs'); // For password hashing

// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use(express.static(path.join(__dirname, '../public')));

// // Start server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // Set up MySQL connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'employeeform',
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to database:', err);
//     return;
//   }
//   console.log('Connected to MySQL database');
// });

// // Create a single unified table if it doesn't already exist
// const createTableQuery = `
//   CREATE TABLE IF NOT EXISTS employee_data (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     email VARCHAR(255) UNIQUE NOT NULL,
//     password VARCHAR(255) NOT NULL,
//     employeeId VARCHAR(255) NOT NULL,
//     mobileNumber VARCHAR(255) NOT NULL,
//     date DATE NOT NULL,
//     loginTime VARCHAR(255),
//     logoutTime VARCHAR(255),
//     sessionType VARCHAR(255),
//     morningTask TEXT,
//     afternoonTask TEXT,
//     suggestionBox TEXT
//   )
// `;

// db.query(createTableQuery, (err) => {
//   if (err) {
//     console.error('Error creating unified table:', err);
//     return;
//   }
//   console.log('Unified table created or already exists');
// });

// // ===================== Registration Endpoint =====================
// app.post('/submit-registration', (req, res) => {
//   const { name, email, password, employeeId, mobileNumber } = req.body;

//   if (!name || !email || !password || !employeeId || !mobileNumber) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   const checkEmailQuery = 'SELECT * FROM employee_data WHERE email = ?';
//   db.query(checkEmailQuery, [email], (err, result) => {
//     if (err) {
//       console.error('Error checking email:', err);
//       return res.status(500).json({ message: 'Error checking email' });
//     }
//     if (result.length > 0) {
//       return res.status(400).json({ message: 'Email is already registered' });
//     }

//     bcrypt.hash(password, 10, (err, hashedPassword) => {
//       if (err) {
//         console.error('Error hashing password:', err);
//         return res.status(500).json({ message: 'Error hashing password' });
//       }

//       const sql = 'INSERT INTO employee_data (name, email, password, employeeId, mobileNumber) VALUES (?, ?, ?, ?, ?)';
//       db.query(sql, [name, email, hashedPassword, employeeId, mobileNumber], (err) => {
//         if (err) {
//           console.error('Error inserting registration data:', err);
//           return res.status(500).json({ message: 'Error inserting data' });
//         }
//         res.status(200).json({ message: 'Registration successful!' });
//       });
//     });
//   });
// });

// // ===================== Login Endpoint =====================
// app.post('/submit-login', (req, res) => {
//   const { date, loginTime, name, mobileNumber } = req.body;

//   if (!date || !loginTime || !name || !mobileNumber) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   const sql = `
//     INSERT INTO employee_data (date, loginTime, name, mobileNumber)
//     VALUES (?, ?, ?, ?)
//     ON DUPLICATE KEY UPDATE loginTime = VALUES(loginTime)
//   `;

//   db.query(sql, [date, loginTime, name, mobileNumber], (err, result) => {
//     if (err) {
//       console.error('Error updating login data:', err);
//       return res.status(500).json({ message: 'Error updating login data' });
//     }

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({ message: 'Login recorded successfully!' });
//   });
// });

// // ===================== Logout Endpoint =====================
// app.post('/submit-logout', (req, res) => {
//   const { date, logoutTime, name, mobileNumber, sessionType, morningTask, afternoonTask, suggestionBox } = req.body;

//   if (!date || !logoutTime || !name || !mobileNumber) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   const sql = `
//     UPDATE employee_data
//     SET logoutTime = ?, sessionType = ?, morningTask = ?, afternoonTask = ?, suggestionBox = ?
//     WHERE date = ? AND name = ? AND mobileNumber = ?
//   `;

//   db.query(sql, [logoutTime, sessionType, morningTask, afternoonTask, suggestionBox, date, name, mobileNumber], (err, result) => {
//     if (err) {
//       console.error('Error updating logout data:', err);
//       return res.status(500).json({ message: 'Error updating logout data' });
//     }

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'No matching login record found' });
//     }

//     res.status(200).json({ message: 'Logout recorded successfully!' });
//   });
// });

// // ===================== Fetch All Data Endpoint =====================
// app.get('/employee-data', (req, res) => {
//   const sql = 'SELECT * FROM employee_data';
//   db.query(sql, (err, result) => {
//     if (err) {
//       console.error('Error fetching employee data:', err);
//       return res.status(500).json({ message: 'Error fetching data' });
//     }
//     res.status(200).json(result);
//   });
// });

// module.exports = app;
