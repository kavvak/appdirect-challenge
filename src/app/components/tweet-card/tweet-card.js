(function(module) {
  'use strict';

  module.component('tweetCard', {
    bindings: {
      tweet: '<'
    },
    controller: 'tweetCardController',
    controllerAs: 'ctrl',
    templateUrl: 'app/components/tweet-card/tweet-card.html'
  });
})(angular.module('appdirect'));

require('./tweet-card.controller.js');
