'use strict';

module.exports = function(app) {
	app.factory('mealsServer', function($http) {

		var errFunc = function(data,status) {
			console.log("error!");
			console.log(data);
			console.log(status);
		};

		var meal = {
			index: function() {
				var promise = $http({
					method:'GET',
					url: '/db'
				})
				.error(function(data,status){
					errFunc(data,status);
				});
				return promise;
			},

			saveNewMeal: function(meal) {
				console.log("meal name in meals-server.js is " + meal.name);
				var promise = $http.post('/db', meal)
					.error(function(data,status){
						errFunc(data,status);
				});
				return promise;
			},

			deleteMeal: function(meal) {
				var promise = $http.delete('/db/' + meal._id)
				.error(function(data,status){
					errFunc(data,status);
				});
				return promise;
			}
	};

	return meal;

	});
};