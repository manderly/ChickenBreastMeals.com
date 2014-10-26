'use strict';

module.exports = function(app) {
	app.directive('mainMealList',function() {
		var direc = {
			restrict: 'EAC',
			templateUrl: 'views/public/main-meal-list.html'
		};

		return direc;
	});
};