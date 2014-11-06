'use strict';

module.exports = function(app) {

	app.controller('cbmAdminController', function($scope, mealsServer, $http, fileReader) {
		$scope.dirtyIngredient = false;

		//Uses meals-server.js to get all the existing meal data
		$scope.getAllMeals = function() {
			mealsServer.index()
			.success(function(data){
				$scope.meals = data;
			});
		};

		$scope.getFile = function () {
		    $scope.progress = 0;
		    fileReader.readAsDataUrl($scope.file, $scope)
		      .then(function(result) {
		        $scope.imageSrc = result;
		        $scope.updatePreviewImage();
		      });
		};

		$scope.difficultyLevels = ['easy','medium','advanced','master'];

		$scope.updatePreviewImage = function() {
			$scope.previewImage = null;
			if ($scope.formMeal.image) { 
				//if formMeal has an image, show that
				$scope.previewImage = $scope.formMeal.image;
			}

			if ($scope.imageSrc) {
				//but check if there's an imageSrc (an updated but unsaved image)
				//and show that instead if there is one
				$scope.previewImage = $scope.imageSrc;
			}
		};

		$scope.createURL = function(recipeName) {
			$scope.formMeal.url = recipeName.replace(/\s+/g,'-').replace(/[^a-zA-Z0-9-]/g,'').toLowerCase();
		};

		$scope.changeIngredient = function(index) {
			if (index == $scope.formMeal.ingredients.length -1) {
				$scope.formMeal.ingredients.push('');
			}
		};

		//saves a new meal or updates an existing meal
		$scope.saveFormContents = function(mealFromForm) {
			console.log("SAVING FORM CONTENTS -- $scope.file is " + JSON.stringify($scope.file));
			//$scope.formMeal.ingredients.pop(); //delete the extra ingredient
			if ($scope.creatingNewMeal === false) {
			//PUT - updating an old meal
				mealsServer.saveOldMeal(mealFromForm,$scope.imageSrc) //this imageSrc wipes saved image because it's empty
				.success(function(data) {
					$scope.getAllMeals();
				});
			} else { 
			//POST - creating new meal
				mealsServer.saveNewMeal($scope.formMeal,$scope.imageSrc)
				.success(function(data) { //perform an asynchronous operation
					$scope.creatingNewMeal = false;
					$scope.getAllMeals();
				});
			}
			$scope.updatePreviewImage();
		};

		$scope.adminSelectMealViewDetails = function(meal) {
			//set the form contents to match the meal object's contents
			$scope.formMeal = meal;

			var lastIngredient = $scope.formMeal.ingredients.length -1;
			if ($scope.formMeal.ingredients[lastIngredient] != '') {
				$scope.formMeal.ingredients.push('');
			}

			$scope.creatingNewMeal = false;

			//unselect the other meals
			$scope.meals.forEach(function(mealIndex) {
				mealIndex.selected = false;
			});
			$scope.meals[$scope.meals.indexOf(meal)].selected=true;

			//set image and dropdown contents
			$scope.imageSrc = null;
			$scope.updatePreviewImage();
		};

		$scope.createNewMeal = function() {
			$scope.formMeal = {}; //set the form to empty
			$scope.creatingNewMeal = true;
			
			//must initialize all these meal components for a new meal
			$scope.formMeal.tags = [];

			//default skillLevel to Easy and show it in the dropdown
			$scope.formMeal.skillLevel = $scope.difficultyLevels[0];
			$scope.formMeal.mealOptions = {
					dairyfree:false,
					glutenfree:false,
					lowcarb:false,
	                lowfat:false,
	                paleo:false,
	                quick:false
				};
			$scope.formMeal.ingredients = [''];
			$scope.formMeal.steps = [];
			$scope.updatePreviewImage();
		};
		

		$scope.deleteMeal = function(meal) {
			mealsServer.deleteMeal(meal)
				.success(function(data) {
					$scope.getAllMeals();
				})
		};

		$scope.orderProp = 'cooktime';

		$scope.getAllMeals();
		$scope.createNewMeal(); //so the empty form works without clicking [create new meal]

	});
};