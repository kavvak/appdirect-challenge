(function(module) {
	'use strict';
	module.controller('AppController', function(AppServices) {
		var self = this;
		self.fetchSourcesData = fetchSourcesData;
		self.source1 = 'AppDirect';
		self.source2 = 'laughingsquid';
		self.source3 = 'techcrunch';
		self.source1Items;
		self.source2Items;
		self.source3Items;

		bootstrap();

		function bootstrap() {
			self.fetchSourcesData();
		}

		function fetchSourcesData() {
			AppServices.fetchSourceData(self.source1).then(function(response) {
				self.source1Items = response;
			});
			AppServices.fetchSourceData(self.source2).then(function(response) {
				self.source2Items = response;
			});
			AppServices.fetchSourceData(self.source3).then(function(response) {
				self.source3Items = response;
			});
		}
	});
})(angular.module('appdirect'));
