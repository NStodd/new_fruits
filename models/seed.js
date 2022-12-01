//////////////////////////////////////////////
//////// Import Dependencies
//////////////////////////////////////////////
const mongoose = require("./connection")
const Fruits = require("./fruit")

//////////////////////////////////////////////
//////// Seed Code
///////////////////////////////////////////////

// Make sure code is not run til connected
 mongoose.connection.on("open", () => {
    ///////////////////
    // Seed Code
    ///////////////////

    const startingFruits =  [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: true },
        { name: "Cherry", color: "red", readyToEat: true },
      ]

    // Delete all fruits
    Fruits.deleteMany({}, (err, data) => {

        // Create new fruits once old fruits are deleted
        Fruits.create(startingFruits, (err, createdFruits) =>{
            console.log("--------FRUITS CREATED----------")
            console.log(createdFruits)
            console.log("--------FRUITS CREATED----------")
            res.json(createdFruits)
                
            //close the DB connection
            mongoose.connection.close()
        })
    })
 })