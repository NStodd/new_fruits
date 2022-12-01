require("dotenv").config()  // Load env variables
const express = require('express') // bring in express to make our app
const morgan = require('morgan') // nice logger for our request
const methodOverride = require('method-override') // allows us to override post request from our ejs/forms
//const mongoose = require('mongoose') // gives us that db connection and cool methods for CRUD to the datas
const PORT = process.env.PORT
const Fruits = require('./models/fruit')
const FruitRouter = require("./controllers/fruit")

const app = express()

/*
const userSchema = new  Schema({
    name: String,
    age: String,
    readyToEat: Boolean
})
const User = model('User', userSchema)
*/

//////////////////////////////////////////////
//////// Middlewares
///////////////////////////////////////////////

app.use(morgan('tiny'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use('/fruits', FruitRouter)



app.listen(PORT, ()=> console.log(`Who let the dogs out on port: ${PORT}`))