const express = require('express');
const bodyPrser = require('body-parser');
const csp = require('express-csp-header');
const mongoose = require('mongoose');

const feedRoute = require('./routes/feed');
const albumRoute = require('./routes/album');

const app = express();
app.use(bodyPrser.json());



app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-origin','*');
    res.setHeader('Access-Control-Allow-Methods','*');
    res.setHeader('Access-Control-Allow-Headers','*');
    //res.header('Content-Security-Policy', '*' );
    next();
});

app.use('/feed',feedRoute);
app.use('/album',albumRoute);

app.get('/',(req,res)=>{
    res.send("Working!!")
})
mongoose.connect('mongodb+srv://Krunal:krunal123@cluster0.nbry0.mongodb.net/music_book?retryWrites=true&w=majority').
        then(result =>{
            app.listen(3000,console.log("Listening"));
        }).catch(err => console.log("hey there"+err));
