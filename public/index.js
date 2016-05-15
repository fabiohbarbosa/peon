(function(angular) {
  'use strict';

  var app = angular.module('peon', [
    'ngRoute',
    'ui.mask',
    'peon-constants-default',
    'peon-constants-profile',
    'peon-components',
    'peon-modules']
  );

  app.config(function($routeProvider) {
    $routeProvider.when('/', { redirectTo: '/client' });
  });

})(angular);
