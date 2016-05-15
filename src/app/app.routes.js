(function(module) {
  'use strict';

  module.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('default', {
        url: '/',
        templateUrl: 'app/app.html',
        controller: 'AppController as ctrl'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'app/app.html',
        controller: 'AppController as ctrl'
      })
      .state('404', {
        url: '/*location',
        templateUrl: 'app/404.html'
      });

    $urlRouterProvider.otherwise('/404');
  })
  .run();

})(angular.module('appdirect'));
