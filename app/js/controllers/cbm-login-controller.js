'use strict';

module.exports = function(app) {
	app.controller('cbmLoginController', function($scope, $location, $rootScope, userFactory) {

		userFactory.getUser().then(function success(response) {
      		$scope.user = response.data;
    	});

		$scope.login = function(username, password) {
			$rootScope.loggedInUser = true; 

	    	userFactory.login(username, password).then(function success(response) {
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