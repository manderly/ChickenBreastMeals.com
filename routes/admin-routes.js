//serverside routes
var fs = require('fs');
//reboot grunt manually if you edit this file
var Meal = require('../models/meal');

module.exports = function(app) {
	var baseUrl = '/db';

	app.get(baseUrl, function(req, res) {
		Meal.find({}, function(err,meals){
			if (err) return res.status(500).json(err);
			return res.send(meals);
		});
	});

	app.get(baseUrl + '/:url', function(req, res) {
		Meal.findOne({'url':req.params.url}, function(err, meal){
			if(err) return res.status(500).json(err);
			return res.json(meal)
		});
	});

	//todo: add authorization
	app.post(baseUrl, function(req, res) {
		var meal = new Meal(req.body);
		meal.save(function(err, resMeal) {
			if (err) return res.status(500).json(err);
			return res.send(resMeal);
		});
	});


	app.get(baseUrl + '/:id', function(req, res) {
		Meal.findOne({'_id':req.params.id}, function(err, meal){
			if(err) return res.status(500).json(err);
			return res.json(meal)
		})
	});

	app.put(baseUrl + '/:id', function(req, res) {
		var meal = req.body;
		delete meal._id;
		Meal.findOneAndUpdate({'_id': req.params.id}, meal, function(err, resMeal) {
			if(err) return res.status(500).json(err);
			return res.json(resMeal)
		});
	});

	app.delete(baseUrl + '/:id', function(req, res) {
		Meal.remove({'_id': req.params.id}, function(err, resMeal) {
			if (err) return res.status(500).json(err);
			return res.status(200).json({'msg':'deleted'});
		});
	});
};