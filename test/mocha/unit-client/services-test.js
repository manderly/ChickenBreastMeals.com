'use strict';

require('../../../app/js/app.js');
require('angular-mocks');

describe('Service tests', function() {

	beforeEach(angular.mock.module('cbmApp'));

	describe('mealsServer tests', function() { 
		
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


		it('has a working meals-server service', inject(function(mealsServer) {
			expect(mealsServer).to.exist;
		}));

		it('creates a new meal with saveNewMeal(meal, image)', inject(function(mealsServer, $httpBackend) {
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

		it('gets an existing meal using index()', inject(function(mealsServer, $httpBackend) {
			$httpBackend
				.expectGET('/db')
				.respond(200);

			var succeeded;
			mealsServer.index()
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

		it('logs in using correct login credentials', inject(function(userFactory, $httpBackend) {

			$httpBackend
				.expectPOST('/login')
				.respond({
					token: 'testToken',
					user: 'cbmadmin'
				})

			var succeeded;
			userFactory.login('cbmadmin', 'p')
			.then(function(response) {
				if (response.data.user === 'cbmadmin' && response.data.token === 'testToken') {
					succeeded = true;
				}
			});
			$httpBackend.flush();
			expect(succeeded).to.be.true;
		}));

		it('fails to log in when login name is incorrect', inject(function(userFactory, $httpBackend) {

			$httpBackend
				//send a 401 because log in info is wrong
				.expectPOST('/login')
				.respond(401, 'Username or password incorrect')

			var succeeded = false;
			userFactory.login('blargus', 'p') //try to log in with wrong name
			.then(function(response) {
				succeeded = true;
			});
			$httpBackend.flush();
			expect(succeeded).to.be.false;
		}));
	});

	describe('fileReader tests', function() { 
		it('has a file-reader service', inject(function(fileReader) {
			expect(fileReader).to.exist;
		}));
	});

});
