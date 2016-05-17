(function(module) {
	'use strict';
	module.controller('AppController', function(AppServices, localStorageService) {
		var self = this;
		self.fetchSourcesData = fetchSourcesData;
		self.getSourceName = getSourceName;
		self.editSourceConfig = editSourceConfig;
		self.closeEditConfig = closeEditConfig;
		self.saveSourceConfig = saveSourceConfig;

		var sourcesConfig = [
			{
				name: 'AppDirect',
				count: 30,
				order: 1
			},
			{
				name: 'laughingsquid',
				count: 30,
				order: 2
			},
			{
				name: 'techcrunch',
				count: 30,
				order: 3
			}
		];

		self.sourcesItems = [[],[],[]];
		self.loading = [false,false,false];

		bootstrap();

		function bootstrap() {
			if (localStorageService.isSupported) {
				var localConfigs = localStorageService.get('sourcesConfig');
				sourcesConfig = localConfigs ? JSON.parse(localConfigs) : sourcesConfig;
			}
			reorderColumns();
			self.fetchSourcesData();
		}

		function getSourceName(index) {
			return sourcesConfig[index].name;
		}

		function closeEditConfig() {
			self.showModal = false;
			self.selectedSourceConfig = undefined;
			self.selectedSourceIndex = -1;
		}

		function editSourceConfig(index) {
			self.showModal = true;
			self.selectedSourceConfig = _.clone(sourcesConfig[index]);
			self.selectedSourceIndex = index;
		}

		function saveSourceConfig() {
			var index = self.selectedSourceIndex;
			if (self.selectedSourceConfig.order !== sourcesConfig[index].order) {
				var oldOrder = sourcesConfig[index].order;
				var newOrder = self.selectedSourceConfig.order;
				sourcesConfig[index].order = self.selectedSourceConfig.order;
				changeOrder(oldOrder, newOrder);
				index = newOrder - 1;
			}
			if (self.selectedSourceConfig.name !== sourcesConfig[index].name ||
					self.selectedSourceConfig.count !== sourcesConfig[index].count) {
				sourcesConfig[index] = _.clone(self.selectedSourceConfig);
				fetchSourceData(index);
			}

			if (localStorageService.isSupported) {
				localStorageService.set('sourcesConfig', JSON.stringify(sourcesConfig));
			}

			self.closeEditConfig();
		}

		function changeOrder(from, to) {
			var toItems = _.clone(self.sourcesItems[to - 1]);
			self.sourcesItems[to - 1] = self.sourcesItems[from - 1];
			self.sourcesItems[from - 1] = toItems;
			sourcesConfig[to - 1].order = from;
			reorderColumns();
		}

		function reorderColumns() {
			sourcesConfig = _.sortBy(sourcesConfig, 'order');
		}

		function fetchSourceData(index) {
			self.sourcesItems[index] = [];
			self.loading[index] = true;
			AppServices.fetchSourceData(sourcesConfig[index]).then(function(response) {
				self.loading[index] = false;
				self.sourcesItems[index] = response;
			});
		}

		function fetchSourcesData() {
			fetchSourceData(0);
			fetchSourceData(1);
			fetchSourceData(2);
		}
	});
})(angular.module('appdirect'));
