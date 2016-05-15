(function(module) {
  'use strict';
  module.provider('AppServices', function() {

    this.$get = function($http) {
      function AppServicesFactory() {
        var baseTwitterUrl = 'http://localhost:7890/1.1/statuses/user_timeline.json';
        this.fetchSourceData = function(source) {
          return $http({
            method: 'GET',
            url: baseTwitterUrl,
            params: {
              screen_name: source,
              count: 30
            }
          }).then(function successCallback(response) {
            return response.data;
          }, function errorCallback(error) {
            return error;
          });
        };
      }

      return new AppServicesFactory();
    };
  });
})(angular.module('appdirect'));