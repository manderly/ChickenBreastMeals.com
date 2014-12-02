'use strict';

describe('E2E: home page (e2e-home-test.js)', function() {

	beforeEach(function() {
		browser.get('http://localhost:3000/#/');
	});

	it('should have the ChickenBreastMeals title', function() {
		expect(browser.getTitle()).toEqual('ChickenBreastMeals');
	});

	it('should load the home page', function() {
		var ele = by.id('cbm');
		expect(browser.isElementPresent(ele)).toBe(true);
	});

});