const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactdance');
const port = 8000;

// mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    danceform: String
});
//modelling schema
const contact = mongoose.model('contact', contactSchema);


// Expess specific stuff
app.use('/static', express.static('static'))  // For serving static files
app.use(express.urlencoded({ extended: true })) //using middleware for getting data from form to express


// pug specific stuff

app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/',(req,res)=>{
    // If you want to pass parameters like title, content you have to follow this method(given below).  
    const params = {};
    res.status(200).render('home.pug',params);
})
app.get('/admission',(req,res)=>{
    // If you want to pass parameters like title, content you have to follow this method(given below).  
    const params = {};
    res.status(200).render('admission.pug',params);
})
app.post('/admission',(req,res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("Form has been submitted sucessfully")
    }).catch(()=>{
        res.status(400).send("Form submission failed. Try again.")
    });
    // res.status(200).render('admission.pug');
})
app.get('/oursocials',(req,res)=>{
    // If you want to pass parameters like title, content you have to follow this method(given below).  
    const params = {};
    res.status(200).render('social.pug',params);
})
app.get('/about',(req,res)=>{
    // If you want to pass parameters like title, content you have to follow this method(given below).  
    const params = {};
    res.status(200).render('about.pug',params);
})
app.get('/classinfo',(req,res)=>{
    // If you want to pass parameters like title, content you have to follow this method(given below).  
    const params = {};
    res.status(200).render('classinfo.pug',params);
})
// app.get('/more',(req,res)=>{
//     // If you want to pass parameters like title, content you have to follow this method(given below).  
//     const params = {};
//     res.status(200).render('more.pug',params);
// })

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});