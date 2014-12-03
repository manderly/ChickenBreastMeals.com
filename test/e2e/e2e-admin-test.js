'use strict';

describe('E2E: admin (e2e-admin-test.js)', function() {

	beforeEach(function() {
		browser.get('http://localhost:3000/#/admin');
	});

	it('go to the login path when accessing /admin route', function() {
		//browser navigateTo and confirming url don't work
	});

	it('ensures the admin can log in', function() {
		//input matches the element's ng-model
		/*
		input('username').enter('cbmadmin');
		input('password').enter('p');
		element('submit').click();
		//expect(browser.location().path()).toBe("/admin");
		var ele = by.id('cbm-admin');
		expect(browser.isElementPresent(ele)).toBe(true);
		*/
	});

/*
	it('keeps invalid username login on the login page', function() {
		browser().navigateTo('#/login');
		expect(browser().location().path()).toBe("/login");

		input('username').enter('blargus');
		input('password').enter('p');
		element('submit').click();
		expect(browser().location().path()).toBe("/login");
	});

	it('keeps invalid password on the login page', function() {
	
	});

	it('doesn't allow access to /admin route when not logged in', function() {
	
	});

	it('has a list of meals when logged in', function() {
	
	});
*/
});