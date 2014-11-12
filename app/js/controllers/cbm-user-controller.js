'use strict'

module.exports = function(app) {
  	app.controller('usersController', function($scope, $http, $cookies, $base64, $location) {

		if($location.path() === '/logout') $cookies.jwt = null;
		
		if(!$cookies.jwt || $cookies.jwt.length >= 10) return $location.path('/admin');

		if($location.path() === '/signup') $scope.newuser = true;

		$scope.signin = function() {
	      	$http.defaults.headers.common['Authorization'] = 'Basic ' + $base64.encode($scope.user.email + ':' + $scope.user.password);
	      	$http({
	        	method: 'GET',
	        	url: '/db/users'
	      	})
	      	.success(function(data) {
	        	$cookies.jwt = data.jwt;
	        	$location.path('/admin');
	      	})
	      	.error(function(data) {
	       		console.log('error');
	        	console.log(data);
	      	});
	    };

	    $scope.validatePassword = function() {
	      	return $scope.user.password === $scope.user.passwordConfirmation;
	    };

	    $scope.createNewUser = function() {
	      	console.log('clicked');
	      	$http({
	        	method: 'POST',
	        	url: '/db/users',
	        	data: $scope.user
	      	})
	      	.success(function(data) {
	        	$cookies.jwt = data.jwt;
	        	$location.path('/admin');
	      	})
	      	.error(function(data) {
	        	console.log('error');
	        	console.log(data);
	      	});
	    };

	});
};