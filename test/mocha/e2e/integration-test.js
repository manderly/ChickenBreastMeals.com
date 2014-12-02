'use strict';

//require('../../../app/js/app.js');
//require('angular-mocks');

describe('Integration/E2E Testing (integration-test.js)', function() {

	/*
	beforeEach(function() {
		browser.get('http://localhost:3000/#/');
	});
*/

	it('should have a title', function() {
		browser.get('http://localhost:3000/#/');
		expect(browser.getTitle()).toEqual('ChickenBreastMeals');
	});

/*
	it('should have the ChickenBreastMeals title', function() {
		expect(browser.getTitle()).toEqual('ChickenBreastMeals');
	});
*/
/*
	it('should stay on the / path when / is accessed', function() {
		browser().navigateTo("#/");
		expect(browser().location().path()).toBe("#/");
	});

	it('ensures the admin can log in', function() {
		browser().navigateTo('#/login');
		expect(browser().location().path()).toBe("/login");

		//input matches the element's ng-model
		input('username').enter('cbmadmin');
		input('password').enter('p');
		element('submit').click();
		expect(browser().location().path()).toBe("/admin");
	});

	it('keeps invalid logins on the login page', function() {
		browser().navigateTo('#/login');
		expect(browser().location().path()).toBe("/login");

		input('username').enter('blargus');
		input('password').enter('p');
		element('submit').click();
		expect(browser().location().path()).toBe("/login");
	});
*/
});