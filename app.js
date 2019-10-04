require('dotenv/config');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const todoRoute = require('./routes/todo');

const app = express();

// connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true,useUnifiedTopology: true},() => 
    console.log('Connected to mongo DB')
);

// init body parser
app.use(express.static('public'));

// set view engine
app.set('view engine','ejs');
app.set(express.static('views'));

// init body parser
app.use(bodyParser.urlencoded({extended: true}));
// parse application/json
app.use(bodyParser.json());



// todo middleware
app.use(todoRoute);


app.get('*',(req,res) => {
    res.status(404).sendFile(path.join(__dirname,'public','404.html'));
});



// start server
const PORT = process.env.PORT || 2020;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));