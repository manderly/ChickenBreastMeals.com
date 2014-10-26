'use strict';

module.exports = function(app) {
	app.config(function($routeProvider) {
		$routeProvider

		//default page
		.when('/', {
			templateUrl: '/views/public/main.html',
			controller: 'cbmMainController'
		})

		.when('/about', {
			templateUrl: '/views/public/about.html',
			controller: 'cbmMainController'
		})

		.when('/tools', {
			templateUrl: '/views/public/tools.html',
			controller: 'cbmMainController'
		})

		.when('/contact', {
			templateUrl: '/views/public/contact.html',
			controller: 'cbmMainController'
		})

		.when('/admin', {
			templateUrl: '/views/admin/admin.html',
			controller: 'cbmMainController'
		})

		.otherwise({
			redirectTo: '/'
		})
	});
};