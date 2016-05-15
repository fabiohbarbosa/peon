(function(angular) {
  'use strict';
  var app = angular.module('client-module');

  app.controller('ClientController', function($cep) {
    var vm = this;

    function init() {
      vm.findCep = findCep;
    }

    function findCep(cep) {
      if (!cep) {
        return;
      }
      $cep.find(cep).then(function(res) {
        // $log.debug(res); TODO
        vm.client = {
          street: res.logradouro,
          city: res.localidade,
          uf: res.uf
        };
      });
    }

    init();
  });
})(angular);
