'use strict';

var mongoose = require('mongoose');

var mealSchema = mongoose.Schema({
	name: String,
	snippet: String,
	description: String,
});

module.exports = mongoose.model('Meal', mealSchema);