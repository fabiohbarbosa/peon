var HttpStatus = require('http-status-codes');

exports.get = function (req, res, next) {
    var id = req.params.id;
    res.json({id: id, name: 'Fabio!'});
};
