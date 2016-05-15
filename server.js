var YAML = require('yamljs');
var configuration = YAML.load('config/configuration.yaml');

var express = require('express');
var app = express();
var http = require('http').Server(app);

var Log = require('log');
var log = new Log('server.js');

var port = configuration.server.port;

// http server
http.listen(port);
app.use(require('cors')());

// json body
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// routes
require('./api')(app, express);
app.use(express.static(configuration.frontEnd.baseDir));

log.info('Server started in port %s', port);
