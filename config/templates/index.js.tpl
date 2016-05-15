(function(angular) {
  'use strict';

  var app = angular.module('<%- projectName %>', [
    'ngRoute',
    '<%- constantsDefault %>',
    '<%- constantsProfile %>',
    '<%- components %>',
    '<%- modules %>']
  );

})(angular);
