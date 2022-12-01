//////////////////////////////////////////////
//////// Import Dependencies
///////////////////////////////////////////////
const express = require("express")
const Fruits = require("../models/fruit")

//////////////////////////////////////////////
//////// Create Router
///////////////////////////////////////////////

const router = express.Router() // router will have all routes attached to it.

//////////////////////////////////////////////
//////// Routes
///////////////////////////////////////////////

// INDEX Route, show the full fruit list
router.get('/', (req, res) => {

    // Get all fruits from mongo and send them back
    Fruits.find({})
    .then((fruits) => {
        // res.json(fruits)
        res.render('fruits/index.ejs', { fruits })
    })
    .catch(err => console.log(err))
})

// NEW Route, bring the user to the New Fruit interface
router.get('/new', (req, res) => {
    res.render('fruits/new.ejs')
})

// CREATE Route. Post a new fruit object to the db, called from new.ejs
router.post('/', (req, res) => {
    
    req.body.readyToEat = req.body.readyToEat === 'on' ? true : false

    Fruits.create(req.body, (err, createdFruit) =>{
        console.log('created' , createdFruit, err)
        res.redirect('/fruits')
    })
} )

// EDIT Route. Take a fruit and change its properties.
router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    // find the fruit and send it to the edit.ejs to prepopulate form
    Fruits.findById(id, (err, foundFruit) =>{
        res.render("fruits/edit.ejs", { fruit : foundFruit})
        //res.json(foundFruit)
    })
})

// Commit the Edit from the EDIT route, called from the edit.ejs page
router.put('/:id', (req, res) => {

    // check if readyToEat should be true or false
    req.body.readyToEat = req.body.readyToEat === "on" ? true: false

    Fruits.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedFruit) => {
        console.log(updatedFruit, err)

        //redirect back to the fruit's show page
        res.redirect(`/fruits/${req.params.id}`)
    })
})

// SHOW Route. Take a fruit and render the data related to it.
router.get('/:id', (req, res)=>{

    // Go and get fruit from the database
    Fruits.findById(req.params.id)
    .then((fruit)=> {
        res.render('fruits/show.ejs', {fruit})
    })
})

// DELETE Route
router.delete('/:id', (req, res) => {

    // Method 1, callback function within findByIdAndDelete
    Fruits.findByIdAndDelete(req.params.id, (err, deletedFruit) => {
        console.log(err, deletedFruit)
        res.redirect('/fruits')
    })

    // Method 2, use .then after calling findByIdAndDelete
    /**
    Fruit.findByIdAndDelete(req.params.id)
    .then((deletedFruit) => {
        console.log(err, deletedFruit)
        res.redirect('/fruits')
    })
    .catch(err => console.log(err))
    */

    // Method 3 async await, await keyword
    /**
    const deletedFruit = await Fruit.findByIdAndDelte(req.params.id)

    if(deletedFruit) {
        res.redirect('/fruits/')
    }*/
})



//////////////////////////////////////////////
//////// Export the Router
///////////////////////////////////////////////
module.exports = router