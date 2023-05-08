const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const DeviceService = require('../services/DeviceService');
const Device = require('../models/Device');


//json parse the body
// Use body-parser middleware to parse JSON body
router.use(bodyParser.json());


//get all device results
router.get('/', (req,res)=>{
    console.log('DeviceRouter get called '+req);
    const deviceService = new DeviceService();
    // Define a callback function to handle the result
    const handleDeviceResult = (deviceObjects) => {
        // Write your code here to handle the result
        console.log('Received device result', deviceObjects);
        // Send the result back to the client or perform any other action
        res.send(deviceObjects);
    };

    // Call the getDevice method with the callback function
    deviceService.getDevice(handleDeviceResult);
});



//insert a device
router.post('/', (req,res)=>{
    console.log('DeviceRouter post called '+req.body);
    const deviceObject = Device.mapFromRow(req.body);
    // Access the JSON body data
    /*const deviceData = JSON.stringify(req.body);
    console.log("DeviceRouter post jsonBody "+deviceData);*/
    
    const deviceService = new DeviceService();

    // Call the getDevice method with the callback function
    deviceService.setDevice(deviceObject);


    res.send("Successfull");
});

//update a device
router.put('/', (req,res)=>{
    const deviceObject = Device.mapFromRow(req.body);
    console.log('DeviceRouter - deviceObject - '+deviceObject.device_name+deviceObject.device_req_date);
    // Access the JSON body data
    /*const deviceData = JSON.stringify(req.body);
    console.log("DeviceRouter post jsonBody "+deviceData);*/
    
    const deviceService = new DeviceService();

    // Call the getDevice method with the callback function
    deviceService.updateDevice(deviceObject);

    res.send("Successfull");
});

//get Device By Id
router.post('/id', (req,res)=>{
    
    const deviceService = new DeviceService();
    // Define a callback function to handle the result
    const deviceObject = Device.mapFromRow(req.body);
    console.log("DeviceRouter - req.body is and Device id is  "+req.body+" #### "+deviceObject.device_id);

    const handleDeviceResult = (deviceObjects) => {
        // Write your code here to handle the result
        console.log('Received device result', deviceObjects);
        // Send the result back to the client or perform any other action
        res.send(deviceObjects);
    };

    // Call the getDevice method with the callback function
    deviceService.getDeviceById(deviceObject, handleDeviceResult);

});



//delete a device
router.delete('/', (req,res)=>{
    console.log('DeviceRouter delete called '+req.body);
    const deviceObject = Device.mapFromRow(req.body);
    // Access the JSON body data
    /*const deviceData = JSON.stringify(req.body);
    console.log("DeviceRouter post jsonBody "+deviceData);*/
    
    const deviceService = new DeviceService();

    // Call the delete method with the callback function
    deviceService.deleteDevice(deviceObject);

    res.send("Successfull");
});


module.exports = router;