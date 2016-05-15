(function(angular) {
  'use strict';

  var app = angular.module('client-module', []);

  app.config(function($routeProvider) {
    var route = function (url, templateUrl) {
      $routeProvider.when(url, { templateUrl: templateUrl });
    };
    route('/client', 'modules/client/dashboard/client.html');
  });

})(angular);
