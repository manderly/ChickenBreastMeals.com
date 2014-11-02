'use strict';

module.exports = function(app) {
	app.controller('cbmRecipeController', function($scope, $http, $routeParams) {
		$scope.params = $routeParams;

		//get, create, edit, delete
		$scope.getRecipe = function() {
			$http.get('/db/' + $scope.params.url).success(function(data) {
				$scope.recipe = data;
			})
			.error(function(data) {
				console.log("getMeals Error: " + data);
			});
		};

		$scope.getRecipe();

	});
};