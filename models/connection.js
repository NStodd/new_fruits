//////////////////////////////////////////////
//////// Import Dependencies
///////////////////////////////////////////////
require("dotenv").config()  // Load env variables
const mongoose = require('mongoose') // gives us db connection and methods for CRUD to the data


//////////////////////////////////////////////
//////// Database Connections
///////////////////////////////////////////////

//const { default: mongoose } = require("mongoose")

const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

//Establish our connections
mongoose.connect(DATABASE_URL, CONFIG)

// Log connections events from mongoose
mongoose.connection
    .on("open", ()=> console.log('Mongoose connected'))
    .on("close", ()=> console.log('Disconnected from Mongoose'))
    .on("error", (error)=> console.log('Mongoose error', error))


//////////////////////////////////////////////
//////// Export the Connection
///////////////////////////////////////////////
module.exports = mongoose