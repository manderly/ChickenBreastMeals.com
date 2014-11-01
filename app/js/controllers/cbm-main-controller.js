'use strict';

module.exports = function(app) {
	app.controller('cbmMainController', function($scope, $http) {

	$scope.siteName = "Chicken Breast Meals.com";
	$scope.orderProp = 'cooktime';

	//viewing and filtering meals
	$scope.filterMeals = function(query, filterByOption) {
	    console.log("Showing meals that meet this criteria: " + query + "or" + filterByOption);
	    return function(meal) {
		    if (meal.title.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
		      return true;
		    } else if (!filterByOption.glutenfree) {
		      return true;
		    } else if (filterByOption.glutenfree && meal.mealOptions.glutenfree) {
		      return true;
		    } else {
		      return false;
		    }
		};
	};

	$scope.selectMealViewDetails = function(meal) {
		console.log("Selecting this meal in meal-list-controller.js: " + meal);
		$scope.mealSelected = true;
		//set mealDetail to meal so we can access its parameters in the view
		$scope.mealDetail = meal;

		//de-select the other meals and highlight the clicked meal
		$scope.meals.forEach(function(mealIndex) {
			mealIndex.selected = false;
		});
		$scope.meals[$scope.meals.indexOf(meal)].selected=true;
	};

	$scope.closePopup = function() {
		console.log("closing the pop up");
		$scope.mealSelected = false;
		$scope.meals.forEach(function(mealIndex) {
			mealIndex.selected = false;
		});
	}

	//get, create, edit, delete
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

	$scope.getMeals();
});

};