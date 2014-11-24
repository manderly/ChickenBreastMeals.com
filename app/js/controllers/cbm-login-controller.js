'use strict';

module.exports = function(app) {
	app.controller('cbmLoginController', function($scope, $location, $rootScope, userFactory) {

		userFactory.getUser().then(function success(response) {
      		$scope.user = response.data;
    	});

		$scope.login = function(username, password) {
	    	userFactory.login(username, password).then(function success(response) {
					$rootScope.loggedInUser = true;
					$scope.user = response.data.user;
	    		$location.path('/admin');
	      		}, $scope.handleError);
	    }

	    $scope.logout = function() {
	      	userFactory.logout();
	      	$scope.user = null;
	    }

	    $scope.handleError = function(response) {
	      	alert('Error: ' + response.data);
	    }

	});
};