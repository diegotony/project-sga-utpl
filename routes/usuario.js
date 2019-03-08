const express = require('express')
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const underscore = require('underscore');


app.get('/user', (req, res) => {
    res.send('Hello')
});


module.exports = app