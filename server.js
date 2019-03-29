require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

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
    console.log("MONGO  IS WORKING ");
});

app.listen(process.env.PORT, () => {
    console.log("NODEJS LISTENING", process.env.PORT);

});