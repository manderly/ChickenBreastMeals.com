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
				$scope.formMeal = {};
				$scope.creatingNewMeal = false;
				$scope.editMealForm.$setPristine();
			});
		};

		$scope.createNewMeal = function() {
			$scope.formMeal = {}; //set the form to empty
			$scope.creatingNewMeal = true;

			//must initialize all these meal components for a new meal
			$scope.formMeal.tags = [];
			formMeal.mealOptions = {
				dairyfree:false,
				glutenfree:false,
				lowcarb:false,
                lowfat:false,
                paleo:false,
                quick:false
			};
			$scope.formMeal.ingredients = [];
			$scope.formMeal.instructions = [];
            $scope.formMeal.images = [];
		};

		$scope.editMeal = function(meal) {
			$scope.formMeal = meal; //set the form contents to match the meal object's contents
			//meal.editing = true; //not sure what this does, removal candidate
			$scope.mealSelected = true;
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