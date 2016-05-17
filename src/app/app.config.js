(function(module) {
	'use strict';

	module.config(function($locationProvider) {
		$locationProvider.html5Mode(true);
	});

	module.config(function (localStorageServiceProvider) {
  	localStorageServiceProvider
    	.setPrefix('appdirect');
	});

})(angular.module('appdirect'));
