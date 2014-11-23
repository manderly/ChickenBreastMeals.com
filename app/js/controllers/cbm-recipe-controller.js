'use strict';

/* Todo: Refactor into recipe controller */
var marked = require('marked/lib/marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

module.exports = function(app) {
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
				$scope.markedDescription = marked($scope.recipe.description);
				//compile the ingredient names so markdown becomes html
				for (var i = 0; i < $scope.recipe.ingredients.length - 1; i ++) {
					$scope.recipe.ingredients[i].name = marked($scope.recipe.ingredients[i].name);
				}
				//compile the step names so markdown becomes html
				for (var j = 0; j < $scope.recipe.steps.length - 1; j ++) {
					$scope.recipe.steps[j].name = marked($scope.recipe.steps[j].name);
				}
			})
			.error(function(data) {
				console.log("getMeals Error: " + data);
			});
		};

		$scope.getRecipe();
	}]);
};