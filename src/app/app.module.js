(function() {
	'use strict';
	angular.module('appdirect',
		[
			'ui.router',
			'ngSanitize'
		]
	);
})();

require('./components');

require('./app.controller.js');
require('./app.services.js');
require('./app.config.js');
require('./app.routes.js');
