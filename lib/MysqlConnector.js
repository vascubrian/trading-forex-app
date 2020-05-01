'use strict';
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Vascu@50',
  database: 'cwg-market'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

module.exports = { connection };
