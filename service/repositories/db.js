// MySQL connection configuration
const mysql = require('mysql');

const connectionConfig = {
    host: 'localhost', // Hostname of your MySQL server
    user: 'root', // MySQL username
    password: 'notroot', // MySQL password
    database: 'devicedb', // Default database to use (optional)
    multipleStatements: true // Allow multiple SQL statements (optional)
};
  
  module.exports = connectionConfig;