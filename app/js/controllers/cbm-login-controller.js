'use strict';

module.exports = function(app) {
	app.controller('cbmLoginController', function($scope, $location, $rootScope, UserFactory) {

		UserFactory.getUser().then(function success(response) {
      		$scope.user = response.data;
    	});

		$scope.login = function(username, password) {
			$rootScope.loggedInUser = true; 

	    	UserFactory.login(username, password).then(function success(response) {
	    		$scope.user = response.data.user;
	    		$location.path('/admin');
	      		}, $scope.handleError);
	    }

	    $scope.logout = function() {
	      	UserFactory.logout();
	      	$scope.user = null;
	    }

	    $scope.handleError = function(response) {
	      	alert('Error: ' + response.data);
	    }

	});
};