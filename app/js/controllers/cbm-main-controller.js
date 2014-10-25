'use strict';

module.exports = function(app) {
	app.controller('cbmMainController', function($scope, $http) {
		$scope.getMeals = function() {
		$http.get('/db').success(function(data) {
			$scope.meals = data;
		})
		.error(function(data) {
			console.log("getMeals Error: " + data);
		});
	};

	$scope.createNewMeal = function(newMeal) {
		$http.post('/db',newMeal)
		.success(function(data) {
			$scope.meals = data;
			console.log("post success: " + data.title);
		})
		.error(function(data) {
			console.log("error: " + data);
		});
	};

	$scope.editMeal = function(existingMeal) {
		$http.put('/db/' + existingMeal._id, existingMeal)
			.success(function(data) {
				$scope.meals = data;
				console.log("Edited meal: " + data.title);
			})
			.error(function(data) {
				console.log("error:" + data);
			});
		};

	$scope.deleteExistingMeal = function(id) {
		$http.delete('/db/'+ id)
			.success(function(data) {
				$scope.meals = data;
				console.log("Successfully deleted a meal. " + data);
			})
			.error(function(data) {
				console.log("error: " + data);
			});
		};
	})
}