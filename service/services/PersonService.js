const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const path = require('path');
const Person = require('../models/Person');


// Require the MySQL connection configuration from db_connect.js
const connectionConfig = require('../repositories/db');


class PersonService {

  constructor() {

  }
  //Get All Person Information
  getPerson(callback) {
    // Create a connection to the MySQL server
    const connection = mysql.createConnection(connectionConfig);

    // Connect to MySQL server
    connection.connect((err) => {
      if (err) throw err;
      console.log('Connected to MySQL server');
    });
    console.log('PersonService getPerson called ');


    // query to server
    connection.query('select * from person', (err, result) => {
      if (err) throw err;

      // If there is no result
      if (result.length === 0) {
        // Write your code here for handling no result
        console.log('No person records found');
        callback(null);
      } else {
        // If there is a result
        // Write your code here for handling the result
        console.log('Query successful', result);

        const personObjects = Person.mapFromRows(result);

        // Call the callback function with the mapped Person objects
        callback(personObjects);
      }

      // Close the MySQL connection
      connection.end((err) => {
        if (err) throw err;
        console.log('Disconnected from MySQL server');
      });
    });
  }



// Update a Person
updatePerson(personObject) {
    // Create a connection to the MySQL server
    const connection = mysql.createConnection(connectionConfig);
  
    // Connect to MySQL server
    connection.connect((err) => {
      if (err) throw err;
      console.log('Connected to MySQL server');
    });
  
    console.log('PersonService updatePerson called with unique id ' + personObject.person_id);
  
    // Update query
    const updateQuery = 'UPDATE person SET person_sl = ?, person_email = ?, person_name = ?, person_team = ?, status = ?, remark = ?, updated_at = NOW(), updated_by = ? WHERE person_id = ?';
  
    // Execute the update query with the values from the personObject
    connection.query(updateQuery, [personObject.person_sl, personObject.person_email, personObject.person_name, personObject.person_team, personObject.status, personObject.remark, personObject.updated_by, personObject.person_id], (err, result) => {
      if (err) throw err;
      console.log('Data updated successfully:', result);
  
      // Close the MySQL connection
      connection.end((err) => {
        if (err) throw err;
        console.log('Disconnected from MySQL server');
      });
    });
  }
  

//Set a Person
setPerson(person) {
    // Create a connection to the MySQL server
    const connection = mysql.createConnection(connectionConfig);

    // Connect to MySQL server
    connection.connect((err) => {
      if (err) throw err;
      console.log('Connected to MySQL server');
    });
    console.log('PersonService setPerson called ' + person);
    // Insert query
    const insertQuery = 'INSERT INTO Person (person_sl, person_email, person_name, person_team, status, remark, created_by, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    // Execute the insert query with the values from the person object
    connection.query(insertQuery, [person.person_sl, person.person_email, person.person_name, person.person_team, person.status, person.remark, person.created_by, person.updated_by], (err, result) => {
      if (err) throw err;
      console.log('Data inserted successfully:', result);
    });

    // Close the MySQL connection
    connection.end((err) => {
      if (err) throw err;
      console.log('Disconnected from MySQL server');
    });
}


//Get Person Information By Id
getPersonById(personObject, callback) {

  //Calling person_id in person object
  console.log('Person Object id is ' + personObject.person_id);

  // Create a connection to the MySQL server
  const connection = mysql.createConnection(connectionConfig);

  // Connect to MySQL server
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL server');
  });

  // Get Person by ID query
  const GetPersonQuery = 'Select * from person WHERE person_id = ?';

  // Execute the delete query with the person_id from the personObject as the parameter
  connection.query(GetPersonQuery, [personObject.person_id], (err, result) => {
    if (err) throw err;
    console.log('Data found by ID successfully:', result);

    personObject = Person.mapFromRow(result[0]);

    console.log("Person Service - Get By Id - " + personObject);

    // Call the callback function with the mapped Person objects
    callback(personObject);

    // Close the MySQL connection
    connection.end((err) => {
      if (err) throw err;
      console.log('Disconnected from MySQL server');
    });
  });
}




// Delete a Person by person_id
deletePerson(personObject) {
  // Create a connection to the MySQL server
  const connection = mysql.createConnection(connectionConfig);

  // Connect to MySQL server
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL server');
  });

  console.log('PersonService deletePerson called with personObject: ', personObject);

  // Delete query
  const deleteQuery = 'DELETE FROM person WHERE person_id = ?';

  // Execute the delete query with the person_id from the personObject as the parameter
  connection.query(deleteQuery, [personObject.person_id], (err, result) => {
    if (err) throw err;
    console.log('Data deleted successfully:', result);

    // Close the MySQL connection
    connection.end((err) => {
      if (err) throw err;
      console.log('Disconnected from MySQL server');
    });
  });
}

}


module.exports = PersonService;
