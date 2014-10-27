'use strict';

var mongoose = require('mongoose');

var mealSchema = mongoose.Schema({
	name: String,
	snippet: String,
	description: String,
	tags: Array,
	mealOptions: Array,
	prepTime: String,
	cookTime: String,
	ovenTemp: String,
	ingredients: Array,
	steps: Array,
	imageUrl: String
});

module.exports = mongoose.model('Meal', mealSchema);