// app.js

const mysql = require('mysql');
const config = require('../config/config');

const pool = mysql.createPool(config.database);

const sqltrial=()=>{

pool.query(`DROP TABLE your_table`, (error, results) => {
  if (error) throw error;
  console.log('The solution is: ', results);
});


// Close the pool when the application is about to exit
// The code you provided is using the process.on('SIGINT', ...) event listener to handle the SIGINT signal. This signal is sent to a process when the user presses Ctrl+C in the terminal, indicating an intention to interrupt and terminate the process.

//process refers to the instance of the Node.js runtime that is currently running your application
process.on('SIGINT', () => {
  pool.end((err) => {
    if (err) throw err;
    console.log('Pool closed');
    process.exit();
  });
});
}
module.exports={sqltrial}

// `CREATE TABLE your_table (
//     id INT PRIMARY KEY NOT NULL UNIQUE,
//     name VARCHAR(255) NOT NULL
// );
// `

// `INSERT INTO your_table_name (id, name) VALUES (1, 'shreya');`

//DROP TABLE