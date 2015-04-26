'use strict';
var webdriver = require('selenium-webdriver');

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

	it('keeps invalid username and correct password on the login page', function() {
    element(by.model('username')).sendKeys('blargus');
    element(by.model('password')).sendKeys('p');

    element(by.id('btn-login')).click();
    //dismiss wrong credentials alert
    browser.driver.sleep(2000);
    browser.switchTo().alert().accept().then(null, function(e) {
      if (e.code !== webdriver.ErrorCode.NO_SUCH_ALERT) {
      throw e;
      }
    });

		expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/#/login");
    expect(element(by.id('cbm-admin')).isPresent()).toBe(false);
	});

});
