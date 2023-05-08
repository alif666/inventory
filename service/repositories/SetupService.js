const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const path = require('path');
// Require the MySQL connection configuration from db_connect.js
const connectionConfig = require('db');


class SetupService{

    constructor(){
        this.sqlFilePath = path.join(__dirname,'./db_setup.sql');
    }

    createTables(){
        console.log('SetupService createTables called ');
        const sql = fs.readFileSync(this.sqlFilePath, 'utf-8');
        console.log('SetupService createTables sql ');
        console.log(sql);


        // Create a connection to the MySQL server
        const connection = mysql.createConnection(connectionConfig);

        // Connect to MySQL server
        connection.connect((err) => {
            if (err) throw err;
            console.log('Connected to MySQL server');
        });

        // query to server
        connection.query(sql,(err, result)=>{
            if (err) throw err;
            console.log('Query successful'+result);
        });

    }
    
}


module.exports = SetupService;
