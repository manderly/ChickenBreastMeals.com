'use strict';

module.exports = function(app) {
	app.config(function($routeProvider) {
		$routeProvider

		.when('/', {
			templateUrl: '/views/public/cbm-main-view.html',
			controller: 'cbmMainController'
		})

		.otherwise({
			redirectTo: '/'
		});
	});
};