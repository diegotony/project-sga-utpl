const express = require('express');
const app = express();
var user = require('./usuario.js')

app.use(user);

module.exports = app;