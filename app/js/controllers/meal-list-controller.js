'use strict';

module.exports = function(app) {
	app.controller('mealListController', function($scope) {
	
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

    $scope.getMeals();

		$scope.viewMealDetail = function(meal) {
			$scope.mealDetail = $scope.meals[$scope.meals.indexOf(meal)];
		};

		$scope.selectThisMeal = function(meal) {
			$scope.meals.forEach(function(mealIndex) {
			mealIndex.selected = false;
		});

		$scope.meals[$scope.meals.indexOf(meal)].selected=true;
	};

	$scope.siteName = "Chicken Breast Meals.com";
	$scope.orderProp = 'cooktime';

	});
}