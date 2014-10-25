'use strict';

module.exports = function(app) {

	app.controller('cbmAdminController', function($scope) {
		$scope.creatingNewMeal = false;
		console.log("initializing creatingNewMeal variable: ", $scope.creatingNewMeal);

		$scope.postMeal = function(mealDetail) {
			if ($scope.creatingNewMeal === false) {
				console.log("$scope.creatingNewMeal is expected FALSE. Is: " + $scope.creatingNewMeal);
				$scope.editMeal(mealDetail); //we're editing an existing, so just edit that meal
			} else { //we're making (posting) a brand new meal
				console.log("$scope.creatingNewMeal = ", $scope.creatingNewMeal);
				mealDetail.mealOptions = {
					dairyfree:false,
					glutenfree:false,
					lowcarb:false,
	                lowfat:false,
	                paleo:false,
	                quick:false
				};
	            $scope.mealDetail.tags = [];
				$scope.mealDetail.ingredients = [];
				$scope.mealDetail.instructions = [];
	            $scope.mealDetail.images = [];
				//todo: add blank arrays and objects when creating a new meal
				$scope.createNewMeal(mealDetail);
				$scope.creatingNewMeal = false; //we're no longer creating a new meal, because it now exists
			}
		};

		$scope.deleteMeal = function(mealDetail) {
			console.log("DELETED!");
			$scope.deleteExistingMeal(mealDetail);
			$scope.getMeals();
		};

		$scope.viewMealDetail = function(meal) {
	        console.log("Calling viewMealDetail " + meal.title);
	        $scope.mealDetail = $scope.meals[$scope.meals.indexOf(meal)];
	        console.log("$scope.creatingNewMeal is expected false: ", $scope.creatingNewMeal);
		};

		$scope.selectCreateNewMeal = function() {
			$scope.mealDetail = {}; //sets everything in the form to empty
			$scope.creatingNewMeal = true;
			console.log("Clicked 'create new meal' in list, set creatingNewMeal to true. Confirm: ", $scope.creatingNewMeal);
		};

		$scope.selectThisMeal = function(meal) {
			$scope.meals.forEach(function(mealIndex) {
				mealIndex.selected=false;
			});
			$scope.meals[$scope.meals.indexOf(meal)].selected=true;
		};

		$scope.siteName = "Chicken Breast Meals.com";
		$scope.orderProp = 'cooktime';
	});
};