const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const PersonService = require('../services/PersonService');
const Person = require('../models/Person');


//json parse the body
// Use body-parser middleware to parse JSON body
router.use(bodyParser.json());


//get all person results
router.get('/', (req,res)=>{
    console.log('PersonRouter get called '+req);
    const personService = new PersonService();
    // Define a callback function to handle the result
    const handlePersonResult = (personObjects) => {
        // Write your code here to handle the result
        console.log('Received person result', personObjects);
        // Send the result back to the client or perform any other action
        res.send(personObjects);
    };

    // Call the getPerson method with the callback function
    personService.getPerson(handlePersonResult);
});



//insert a person
router.post('/', (req,res)=>{
    console.log('PersonRouter post called '+req.body);
    const personObject = Person.mapFromRow(req.body);
    // Access the JSON body data
    /*const personData = JSON.stringify(req.body);
    console.log("PersonRouter post jsonBody "+personData);*/
    
    const personService = new PersonService();

    // Call the getPerson method with the callback function
    personService.setPerson(personObject);


    res.send("Successfull");
});

//update a person
router.put('/', (req,res)=>{
    const personObject = Person.mapFromRow(req.body);
    console.log('PersonRouter - personObject - '+personObject.person_name+personObject.person_req_date);
    // Access the JSON body data
    /*const personData = JSON.stringify(req.body);
    console.log("PersonRouter post jsonBody "+personData);*/
    
    const personService = new PersonService();

    // Call the getPerson method with the callback function
    personService.updatePerson(personObject);

    res.send("Successfull");
});

//get Person By Id
router.post('/id', (req,res)=>{
    
    const personService = new PersonService();
    // Define a callback function to handle the result
    const personObject = Person.mapFromRow(req.body);
    console.log("PersonRouter - req.body is and Person id is  "+req.body+" #### "+personObject.person_id);

    const handlePersonResult = (personObjects) => {
        // Write your code here to handle the result
        console.log('Received person result', personObjects);
        // Send the result back to the client or perform any other action
        res.send(personObjects);
    };

    // Call the getPerson method with the callback function
    personService.getPersonById(personObject, handlePersonResult);

});



//delete a person
router.delete('/', (req,res)=>{
    console.log('PersonRouter delete called '+req.body);
    const personObject = Person.mapFromRow(req.body);
    // Access the JSON body data
    /*const personData = JSON.stringify(req.body);
    console.log("PersonRouter post jsonBody "+personData);*/
    
    const personService = new PersonService();

    // Call the delete method with the callback function
    personService.deletePerson(personObject);

    res.send("Successfull");
});


module.exports = router;