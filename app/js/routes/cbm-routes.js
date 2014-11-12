'use strict';

module.exports = function(app) {
	app.config(function($routeProvider, $locationProvider) {
		$routeProvider

			.when('/', {
				templateUrl: '/views/public/main.html',
				controller: 'cbmMainController'
			})

			.when('/recipe/:url', {
				templateUrl: '/views/public/recipe.html',
				controller: 'cbmRecipeController'
			})

			.when('/about', {
				templateUrl: '/views/public/about.html',
				controller: 'cbmMainController'
			})

			.when('/tools', {
				templateUrl: '/views/public/tools.html',
				controller: 'cbmMainController'
			})

			.when('/admin', {
				templateUrl: '/views/admin/admin.html',
				controller: 'cbmAdminController',
			})

			.when('/login', {
				templateUrl: '/views/admin/login.html',
				controller: 'cbmLoginController'
			})

			.otherwise({
				redirectTo: '/'
			});
	})
	.run(function($rootScope, $location) {
		$rootScope.$on("$routeChangeStart", function(event,next,current) {
			if ($rootScope.loggedInUser == null) {
				if (next.templateUrl === '/views/admin/admin.html') {
					$location.path('/login');
				}
			}
		});
	});
};