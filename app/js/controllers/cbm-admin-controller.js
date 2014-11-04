'use strict';

module.exports = function(app) {

	app.controller('cbmAdminController', function($scope, mealsServer, $http, fileReader) {

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

		$scope.difficultyLevels = [
			{name:'easy'},
			{name:'medium'},
			{name:'advanced'},
			{name:'master'}
		];

		$scope.updatePreviewImage = function() {
			console.log("ADMIN: Updating preview image!");
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
		}

		//saves a new meal or updates an existing meal
		$scope.saveFormContents = function(mealFromForm) {
			console.log("SAVING FORM CONTENTS -- $scope.file is " + JSON.stringify($scope.file));
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
			
			$scope.formMeal = meal; //set the form contents to match the meal object's contents
			$scope.adminMealSelected = true;
			$scope.creatingNewMeal = false;
			$scope.mealSelected = true;

			$scope.meals.forEach(function(mealIndex) {
				mealIndex.selected = false;
			});
			$scope.meals[$scope.meals.indexOf(meal)].selected=true;

			$scope.imageSrc = null;
			$scope.updatePreviewImage();
		};

		$scope.createNewMeal = function() {
			console.log("ADMIN: In 'create new meal' mode");
			$scope.formMeal = {}; //set the form to empty
			$scope.creatingNewMeal = true;

			//must initialize all these meal components for a new meal
			$scope.formMeal.tags = [];
			$scope.formMeal.mealOptions = {
					dairyfree:false,
					glutenfree:false,
					lowcarb:false,
	                lowfat:false,
	                paleo:false,
	                quick:false
				};
			$scope.formMeal.ingredients = [];
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