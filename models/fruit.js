//////////////////////////////////////////////
//////// Import Dependencies
///////////////////////////////////////////////
const mongoose = require("./connection")


//////////////////////////////////////////////
//////// Fruits Model
///////////////////////////////////////////////

const { Schema, model } = mongoose // destructuring, grabbing model and Schema off mongoose variable
// mongoose.Schema
// mongoose.model


// make the fruits schema
const fruitsSchema = new  Schema({
    name: String,
    color: String,
    readyToEat: Boolean
})

// make the Fruit model
const Fruits = model('Fruits', fruitsSchema)

// Export the model
module.exports = Fruits