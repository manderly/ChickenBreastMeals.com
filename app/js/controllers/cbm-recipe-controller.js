'use strict';

module.exports = function(app) {
	app.controller('cbmRecipeController', function($scope, $http, $routeParams) {
		$scope.params = $routeParams;

		$scope.getPrepTimeTotal = function(meal) {
			return parseInt(meal.cookTime) + parseInt(meal.prepTime);
		};

		$scope.getRecipe = function() {
			$http.get('/db/' + $scope.params.url)
			.success(function(data) {
				$scope.recipe = data;
				$scope.totalTime = $scope.getPrepTimeTotal($scope.recipe);
			})
			.error(function(data) {
				console.log("getMeals Error: " + data);
			});
		};

		$scope.getRecipe();
	});
};