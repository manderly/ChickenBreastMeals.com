'use strict';

module.exports = function(app) {
	app.factory('mealsServer', function($http) {

		var errFunc = function(data,status) {
			console.log("error!");
			console.log(data);
			console.log(status);
		};

		var parseMeal = function(meal) {
			return {
				mealName: meal.name,
				mealSnippet: meal.snippet,
				mealDescription: meal.description,
				mealTags: meal.tags,
				mealPrepTime: meal.prepTime,
				mealCookTime: meal.cookTime,
				mealOvenTemp: meal.ovenTemp,
				mealIngredients: meal.ingredients,
				mealSteps: meal.steps,
				mealPhotos: meal.photos
			}
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
				var promise = $http.post('/db',parseMeal(meal))
					.error(function(data,status){
						errFunc(data,status);
				});
				return promise;
			},

			deleteMeal: function(meal) {
				var promise = $http.delete('/db' + meal._id)
				.error(function(data,status){
					errFunc(data,status);
				});
				return promise;
			},
	};

	return meal;

	});
};