'use strict';

describe('E2E: admin login (e2e-admin-test.js)', function() {

	beforeEach(function() {
		browser.get('/#/admin');
	});

	it('goes to the login page when the user is not authenticated', function() {
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#/login');
	});

	it('allows the admin to log in', function() {
		element(by.model('username')).sendKeys('cbmadmin');
		element(by.model('password')).sendKeys('p');
		element(by.id('btn-login')).click();

		expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/#/admin");
		expect(element(by.id('cbm-admin')).isPresent()).toBe(true);
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
