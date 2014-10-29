'use strict';

module.exports = function(app) {

	app.controller('cbmAdminController', function($scope, mealsServer, $http, fileReader) {
		$scope.creatingNewMeal = false;
		$scope.placeholderArray = ["Add ingredient", "Add another ingredient"];

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
		      });
		};

		//saves a new meal or updates an existing meal
		$scope.saveFormContents = function(mealFromForm) {
			console.log("$scope.file is " + JSON.stringify($scope.file));
			if ($scope.creatingNewMeal === false) {
				$scope.saveOldMeal(mealFromForm,$scope.imageSrc);
			} else {
				mealsServer.saveNewMeal($scope.formMeal,$scope.imageSrc)
				.success(function(data) { //perform an asynchronous operation
					$scope.meals.push(data);
					$scope.formMeal = {};
					$scope.creatingNewMeal = false;
					$scope.editMealForm.$setPristine();
				});
			}
		};

		$scope.adminSelectMealViewDetails = function(meal) {
			$scope.adminMealSelected = true;
			$scope.meals.forEach(function(mealIndex) {
				mealIndex.selected = false;
			});
			$scope.meals[$scope.meals.indexOf(meal)].selected=true;
		};

		$scope.saveOldMeal = function(mealFromForm) {
			console.log("admin-controller.js mealfromform is " + mealFromForm._id);
			mealsServer.saveOldMeal(mealFromForm)
				.success(function(data) {
					$scope.getAllMeals();
				});
		};

		$scope.createNewMeal = function() {
			console.log("in create new meal mode");
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
		};



		$scope.editMeal = function(meal) {
			$scope.formMeal = meal; //set the form contents to match the meal object's contents
			$scope.creatingNewMeal = false; //not sure what this does, removal candidate
			$scope.mealSelected = true;
		};

		

		$scope.deleteMeal = function(meal) {
			mealsServer.deleteMeal(meal)
				.success(function(data) {
					$scope.getAllMeals();
				})
		};

		//http://stackoverflow.com/questions/17216806/angularjs-uploading-an-image-with-ng-upload
		$scope.uploadFile = function(files) {
		    var fd = new FormData();
		    //Take the first selected file
		    fd.append("file", files[0]);

		    $http.post(uploadUrl, fd, {
		        withCredentials: true,
		        headers: {'Content-Type': undefined },
		        transformRequest: angular.identity
		    })
		    .success(function() {
		    	console.log("successfully uploaded image");
		    })
		    .error(function() {
		    	console.log("error uploading image");
		    })
		};

		$scope.siteName = "Chicken Breast Meals.com";
		$scope.orderProp = 'cooktime';

		$scope.getAllMeals();
		$scope.createNewMeal();
	});
};