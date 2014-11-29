'use strict';

require('../../../app/js/app.js');
require('angular-mocks');

describe('Service tests', function() {

	beforeEach(angular.mock.module('cbmApp'));

	describe('mealsServer tests', function() { 
		it('has a working meals-server service', inject(function(mealsServer) {
			expect(mealsServer).to.exist;
		}));

		it('creates a new meal', inject(function(mealsServer, $httpBackend) {
		var fakeMeal = {
			name:'Fake Meal',
			url:'fake-meal-url',
			snippet: 'fake meal snippet',
			description: 'fake meal description',
			tags: ['faketag1','faketag2'],
			skillLevel: 'easy',
			yield: 1,
			plural: 'fake meals',
			mealOptions: '{test}',
			prepTime: 5,
			cookTime: 5,
			ovenTemp: 425,
			ingredients: ['ingredient1', 'ingredient2'],
			steps: ['step1', 'step2'],
			image: 'imagepath',
			kCalPerServing: 500,
			kCalTotal: 1500,
			published: true,
			rating:5
		};

		$httpBackend
			.expectPOST('/db', fakeMeal)
			.respond(200);
			var succeeded;
			mealsServer.saveNewMeal(fakeMeal,fakeMeal.image)
			.then(function() {
				succeeded = true;
			});
		$httpBackend.flush();
		expect(succeeded).to.be.true;
		
		}));
	});

	describe('userFactory tests', function() { 
		it('has a user-factory service', inject(function(userFactory) {
			expect(userFactory).to.exist;
		}));
	});

	describe('fileReader tests', function() { 
		it('has a file-reader service', inject(function(fileReader) {
			expect(fileReader).to.exist;
		}));
	});

});
