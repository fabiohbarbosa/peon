exports.startServer = function() {
    var app = require('express')();
    var http = require('http').Server(app);
    var port = 3000;

    // http server
    function createHttpServer() {
        http.listen(port);
        app.use(require('cors')());
    }

    // json body
    function configureJsonBody() {
        var bodyParser = require('body-parser');
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
    }

    function init() {
      createHttpServer();
      configureJsonBody();
      console.log('Server started in port %s', port);
    }

    init();
    return app;
};
