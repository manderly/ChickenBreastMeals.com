'use strict';

module.exports = function(app) {
	app.config(function($routeProvider, $locationProvider) {
		$routeProvider
			//default page
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
				resolve: {
					auth: ["$q","UserFactory", function($q, UserFactory) {
						var userInfo = UserFactory.getUser();

						if (userInfo) {
							console.log("user info exists");
							console.log(userInfo);
							redirectTo:'/admin'
							return $q.when(userInfo);
						} else {
							console.log("user info rejected");
							redirectTo:'/login'
							return $q.reject({ authenticated: false });
						}
					}]
				}
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
				console.log("user is not logged in")
				if (next.templateUrl === '/views/admin/admin.html') {
					$location.path('/login');
				}
			}
		});
	});
};