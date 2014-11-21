'use strict';

module.exports = function(app, marked) {
	app.controller('cbmRecipeController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
		$scope.params = $routeParams;

		$scope.getPrepTimeTotal = function(meal) {
			return parseInt(meal.cookTime) + parseInt(meal.prepTime);
		};

		$scope.getRecipe = function() {
			$http.get('/db/' + $scope.params.url)
			.success(function(data) {
				$scope.recipe = data;
				$scope.totalTime = $scope.getPrepTimeTotal($scope.recipe);
				$scope.recipe.description = marked($scope.recipe.description);
				console.log(marked('Recipe is using __markdown__.'));
			})
			.error(function(data) {
				console.log("getMeals Error: " + data);
			});
		};

		$scope.getRecipe();
	}]);
};