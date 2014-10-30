'use strict';

module.exports = function(app) {
	app.factory('mealsServer', function($http) {

		var errFunc = function(data,status) {
			console.log("error in meals-server.js!");
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

			saveOldMeal: function(meal,image) {
				console.log("SAVING EXISTING MEAL " + meal.name);
				if (image) {
					meal.image = image;
				} //if imageSrc has been updated, use the new image. Otherwise, don't
				var promise = $http.put('/db/' + meal._id, meal)
					.error(function(data,status){
						errFunc(data,status);
				});
				return promise;
			},

			saveNewMeal: function(meal,image) {
				console.log("SAVING NEW MEAL: " + meal.name);
				meal.image = image;
				var promise = $http.post('/db', meal)
					.error(function(data,status){
						errFunc(data,status);
				});
				return promise;
			},


			deleteMeal: function(meal) {
				console.log("deleting meal in meals-server.js " + meal.name);
				console.log("meal._id is: " + meal._id);
				var promise = $http.delete('/db/' + meal._id)
				.error(function(data,status){
					errFunc(data,status);
				});
				return promise;
			},
		};

		return meal;

	});
};