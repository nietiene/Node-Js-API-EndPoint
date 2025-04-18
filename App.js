"use strict"

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const App = express();

// Initialize
App.use(bodyParser.json());
App.use(bodyParser.urlencoded({extended : true}));

// Create An Array

const food = [
    {id: 1, Name: "Apple", Supplier: "John"},
    {id: 2, Name: "Orange", Supplier: "John"},
    {id: 3, Name: "Mango", Supplier: "John"},
    {id: 4, Name: "Pineaple", Supplier: "John"},
]
App.get('/', (req, res) => {
    res.send("Welcome");
});

// Retrieving Food In Array

App.get('/food', (req ,res) => {
    res.json(food);
});

// Retrieve Item by Id

App.get('/food/:id', (req, res) => {

    const id = parseInt(req.params.id);
    const foods = food.find(food => food.id === id);

    if (foods) {
        res.status(200).json(foods);
    } else {
        res.status(404).json("Food not found")
    }
});

//Insert Food In  existing Array 

App.post('/food', (req, res) => {
     
 const {id, Name, Supplier} = req.body;

 if (!id || !Name || !Supplier) {
   
    res.json("Misssed Id, Name, Supplier");
 } 
 
 const ExistFood = food.some(food => food.id === id);

 if (ExistFood) {
    res.status(409).json({Error: `Item with Id ${id} Already Exist`});
 } 

    const NewFood = {id, Name, Supplier};
    food.push(NewFood);
    res.status(201).json({Message:"Data Inseted Successfully"});
 
  
});

// Update Food By Id

App.put('/food/:id', (req, res) => {
    
    const id = parseInt(req.params.id);
    const index = food.findIndex(food => food.id === id);

    if (index !== -1) {

        food[index] = {...food[index], ...req.body};
        res.status(200).json({Message:"Data Updated",food: food[index]});
    } else {
        res.status(404).json({Error: "Not Found"});
    }
});

App.delete('/food/:id', (req, res) => {

    const id = parseInt(req.params.id);
    const index = food.findIndex(food => food.id === id);

    if ( index !== -1 ) {
        const deleted = food.splice(index, 1);
        res.status(200).json({message: "Deleted", deleted});
    } else { 
        res.status(404).json("Food not found");
    }
});
const PORT = process.env.PORT || 3000;
App.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});