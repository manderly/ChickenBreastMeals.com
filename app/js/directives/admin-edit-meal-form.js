'use strict';

module.exports = function(app) {
	app.directive('adminEditMealForm',function() {
		var direc = {
			restrict: 'EAC',
			templateUrl: 'views/admin/admin-edit-meal-form.html'
		};

		return direc;
	});
};