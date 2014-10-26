'use strict';

module.exports = function(app) {

	app.controller('cbmAdminController', function($scope, mealsServer) {
		$scope.creatingNewMeal = false;

		//Uses meals-server.js to get all the existing meal data
		$scope.getAllMeals = function() {
			mealsServer.index()
			.success(function(data){
				$scope.meals = data;
			});
		};

		$scope.getAllMeals();

		//saves a new meal along with all its components
		$scope.saveNewMeal = function(form) {
			mealsServer.saveNewMeal($scope.formMeal)
			.success(function(data) {
				$scope.meals.push(data);
				$scope.formMeal.name = '';
				$scope.formMeal.snippet = '';
				$scope.creatingNewMeal = false;
				$scope.editMealForm.$setPristine();
			});
		};

		$scope.createNewMeal = function() {
			$scope.formMeal = {}; //set the form to empty
			$scope.creatingNewMeal = true;
			console.log("Creating a new meal cbm-admin-controller.js");
		};

		$scope.editMeal = function(meal) {
			console.log("editing this meal: " + meal);
			//meal.editing = true; //not sure what this does, removal candidate
			$scope.mealSelected = true;
			//set mealEdit to meal so we can access its parameters
			$scope.formMeal = meal;
		};

		$scope.saveMeal = function(meal) {
			mealsServer.saveOldMeal(meal)
				.success(function(data) {
					$scope.getAllMeals();
				});
		};

		$scope.deleteMeal = function(meal) {
			mealsServer.deleteMeal(meal)
				.success(function(data) {
					$scope.getAllMeals();
				})
		};
		
		$scope.siteName = "Chicken Breast Meals.com";
		$scope.orderProp = 'cooktime';
	});
};