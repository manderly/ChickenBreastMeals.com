'use strict';

module.exports = function(app) {
	app.directive('newMealForm',function() {
		var direc = {
			restrict: 'EAC',
			templateUrl: 'views/admin/new-meal-form.html'
		};

		return direc;
	});
};