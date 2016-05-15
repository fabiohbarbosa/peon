(function(angular) {
  var app = angular.module('peon-components');
  app.service('$cep', function($http, $q, wsCep) {

    this.find = function(cep) {
      var deferred = $q.defer();
      $http.get(wsCep + cep + '/json').
      success(function(data, status, headers, config) {
        deferred.resolve(data);
      }).
      error(function(data, status, headers, config) {
        deferred.reject(status);
      });
      return deferred.promise;
    };
  });
})(angular);
