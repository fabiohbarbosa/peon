module.exports = function(app, express) {
    var apiRoutes = express.Router();

    var glob = require('glob');
    var routes = glob.sync(__dirname+'/**/*route.js');

    routes.forEach(function (route) {
        require(route)(apiRoutes);
    });

    app.use('/api', apiRoutes);
};
