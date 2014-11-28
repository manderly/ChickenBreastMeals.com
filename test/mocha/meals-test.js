/*
'use strict';

require('../../app/js/app.js');
require('angular-mocks');

describe('Testing admin controller', function() {

	beforeEach(angular.mock.module('cbmApp'));

	it('should pass a simple test: true = true', function() {
    	expect(true).to.equal(true);
  	});

	it('should have a working meals-server service', inject(function(mealsServer) {
		expect(mealsServer).toBeDefined();
	}));

	it('should have a working user-factory service', inject(function(userFactory) {
		expect(userFactory).toBeDefined();
	}));

	it('should have a working file-reader service', inject(function(fileReader) {
		expect(fileReader).toBeDefined();
	}));

});

*/