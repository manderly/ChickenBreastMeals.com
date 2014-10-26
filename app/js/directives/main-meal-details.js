'use strict';

module.exports = function(app) {
	app.directive('mainMealDetails',function() {
		var direc = {
			restrict: 'EAC',
			templateUrl: 'views/public/main-meal-details.html'
		};

		return direc;
	});
};