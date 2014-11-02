'use strict';

var mongoose = require('mongoose');

var mealSchema = mongoose.Schema({
	name: String,
	url: String,
	snippet: String,
	description: String,
	tags: Array,
	skillLevel: String,
	mealOptions: Object,
	prepTime: String,
	cookTime: String,
	ovenTemp: String,
	ingredients: Array,
	steps: Array,
	image: String,
	published: Boolean,
});

module.exports = mongoose.model('Meal', mealSchema);