require('./config/config');
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())


app.use(require('./routes/usuario'));

// DB config

mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;
    console.log("MONGO  ");

});

app.listen(process.env.PORT, () => {
    console.log("NODEJS", process.env.PORT);

})