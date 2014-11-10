'use strict';

module.exports = function(app) {
	app.controller('cbmMainController', function($scope, $http, $location) {

	$scope.siteName = "Chicken Breast Meals.com";
	$scope.orderProp = 'cooktime';

	$scope.getOptionsFor = function(propName) {
		return ($scope.meals || []).map(function (meal) {
			return meal[propName];
		}).filter(function(meal, index, array) {
			return array.indexOf(meal) === index;
		});
	};

	//viewing and filtering meals by properties
	//thanks: http://jsfiddle.net/ExpertSystem/wYfs4/
	$scope.filterMeals = function(meal) {
		//check if each (published) meal contains any mealOptions that exist in $scope.filter object
		if (meal.published) {
		    var matches = true;
		    for (var name in $scope.filter) {
		    	if ($scope.filter[name] && !meal.mealOptions[name]) {
		    		matches = false;
		    		break;
		    	}
		    }
		    return matches;
		}
	};

	$scope.viewRecipe = function(meal) {
		console.log("Selecting this meal in meal-list-controller.js: " + meal);
		$location.path('/recipe/' + meal.url);
	};

	//get, create, edit, delete
	$scope.getMeals = function() {
		$http.get('/db').success(function(data) {
			$scope.meals = data;
		})
		.error(function(data) {
			console.log("getMeals Error: " + data);
		});
	};

//removal candidates
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

//removal candidates
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

//removal candidates
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

	$scope.getMeals();
});

};