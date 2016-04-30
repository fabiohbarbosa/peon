var app = require('./server').startServer();

// routes
var express = require('express');
require('./api')(app, express);

app.use(express.static('./public'));
