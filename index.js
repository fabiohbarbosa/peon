var app = require('./server').startServer();
require('./api')(app);
