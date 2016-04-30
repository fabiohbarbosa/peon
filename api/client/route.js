module.exports = function(apiRoutes) {
    var ENDPOINT = '/client/';
    var controller = require('./controller');
    apiRoutes.get(ENDPOINT+':id', controller.get);
};
