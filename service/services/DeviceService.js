const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const path = require('path');
const Device = require('../models/Device');


// Require the MySQL connection configuration from db_connect.js
const connectionConfig = require('../repositories/db');


class DeviceService {

  constructor() {

  }
  //Get All Device Information
  getDevice(callback) {
    // Create a connection to the MySQL server
    const connection = mysql.createConnection(connectionConfig);

    // Connect to MySQL server
    connection.connect((err) => {
      if (err) throw err;
      console.log('Connected to MySQL server');
    });
    console.log('DeviceService getDevice called ');


    // query to server
    connection.query('select * from device', (err, result) => {
      if (err) throw err;

      // If there is no result
      if (result.length === 0) {
        // Write your code here for handling no result
        console.log('No device records found');
        callback(null);
      } else {
        // If there is a result
        // Write your code here for handling the result
        console.log('Query successful', result);

        const deviceObjects = Device.mapFromRows(result);

        // Call the callback function with the mapped Device objects
        callback(deviceObjects);
      }

      // Close the MySQL connection
      connection.end((err) => {
        if (err) throw err;
        console.log('Disconnected from MySQL server');
      });
    });
  }



  // Update a Device
  updateDevice(deviceObject) {
    // Create a connection to the MySQL server
    const connection = mysql.createConnection(connectionConfig);

    // Connect to MySQL server
    connection.connect((err) => {
      if (err) throw err;
      console.log('Connected to MySQL server');
    });

    console.log('DeviceService updateDevice called with unique id ' + deviceObject.device_id);

    // Update query
    const updateQuery = 'UPDATE device SET device_sl = ?, device_name = ?, device_category = ?, device_req_date = ?, remark = ?, status = ?, updated_at = NOW(), updated_by = ? WHERE device_id = ?';
    deviceObject.device_req_date = new Date().toISOString().slice(0, 10);
    // Execute the update query with the values from the deviceObject
    connection.query(updateQuery, [deviceObject.device_sl, deviceObject.device_name, deviceObject.device_category, deviceObject.device_req_date, deviceObject.remark, 'active',deviceObject.updated_by,deviceObject.device_id], (err, result) => {
      if (err) throw err;
      console.log('Data updated successfully:', result);

      // Close the MySQL connection
      connection.end((err) => {
        if (err) throw err;
        console.log('Disconnected from MySQL server');
      });
    });
  }

  //Set a Device 
  setDevice(device) {
    // Create a connection to the MySQL server
    const connection = mysql.createConnection(connectionConfig);

    // Connect to MySQL server
    connection.connect((err) => {
      if (err) throw err;
      console.log('Connected to MySQL server');
    });
    console.log('DeviceService setDevice called ' + device);
    // Insert query
    const insertQuery = "INSERT INTO device (device_sl, device_name, device_category, device_req_date, remark, created_by, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?)";

    // Execute the insert query with the values from the deviceObject
    device.device_req_date = new Date().toISOString().slice(0, 10); // get current date in yyyy-MM-dd format
    connection.query(insertQuery, [device.device_sl, device.device_name, device.device_category, device.device_req_date, device.remark, device.created_by, device.updated_by], (err, result) => {
      if (err) throw err;
      console.log('Data inserted successfully:', result);
    });


    // Close the MySQL connection
    connection.end((err) => {
      if (err) throw err;
      console.log('Disconnected from MySQL server');
    });

}

//Get Device Information By Id
getDeviceById(deviceObject, callback) {

  //Calling device_id in device object
  console.log('Device Object id is ' + deviceObject.device_id);

  // Create a connection to the MySQL server
  const connection = mysql.createConnection(connectionConfig);

  // Connect to MySQL server
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL server');
  });

  // Get Device by ID query
  const GetDeviceQuery = 'Select * from device WHERE device_id = ?';

  // Execute the delete query with the device_id from the deviceObject as the parameter
  connection.query(GetDeviceQuery, [deviceObject.device_id], (err, result) => {
    if (err) throw err;
    console.log('Data found by ID successfully:', result);

    deviceObject = Device.mapFromRow(result[0]);

    console.log("Device Service - Get By Id - " + deviceObject);
    deviceObject.device_req_date = new Date().toISOString().slice(0, 10);
    // Call the callback function with the mapped Device objects
    callback(deviceObject);

    // Close the MySQL connection
    connection.end((err) => {
      if (err) throw err;
      console.log('Disconnected from MySQL server');
    });
  });
}




// Delete a Device by device_id
deleteDevice(deviceObject) {
  // Create a connection to the MySQL server
  const connection = mysql.createConnection(connectionConfig);

  // Connect to MySQL server
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL server');
  });

  console.log('DeviceService deleteDevice called with deviceObject: ', deviceObject);

  // Delete query
  const deleteQuery = 'DELETE FROM device WHERE device_id = ?';

  // Execute the delete query with the device_id from the deviceObject as the parameter
  connection.query(deleteQuery, [deviceObject.device_id], (err, result) => {
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


module.exports = DeviceService;
