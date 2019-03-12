const express = require('express');
const app = express();

// Collections of routes

app.use(require('./usuario'));
app.use(require('./sala'));

module.exports = app;