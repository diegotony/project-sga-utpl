require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(require('./routes/index'));

// DB config

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true
}, (error, res) => {
    if (error) throw error;
    console.log("MONGO IS WORKING ");
});

// Port 

app.listen(process.env.PORT, () => {
    // console.log("NODEJS LISTENING ", process.env.PORT);    
    console.log("NODEJS WORKING ");

});