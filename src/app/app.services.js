(function(module) {
  'use strict';
  module.provider('AppServices', function() {

    this.$get = function($http) {
      function AppServicesFactory() {
        var basetwitterUrl = 'http://localhost:7890/1.1/statuses/user_timeline.json';
        this.fetchSourceData = function(source) {
          return $http({
            method: 'GET',
            url: basetwitterUrl,
            params: {
              screen_name: source.name,
              count: source.count
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
