'use strict';

module.exports = function(app) {
	app.config(function($routeProvider) {
		$routeProvider

		//default page
		.when('/', {
			templateUrl: '/views/public/meal-list.html',
			controller: 'cbmMainController'
		})

		.when('/contact', {
			templateUrl: '/views/public/contact.html',
			controller: 'cbmMainController'
		})

		.otherwise({
			redirectTo: '/'
		})
	});
};