'use strict';

require('../../../app/js/app.js');
require('angular-mocks');

describe('Testing admin controller', function() {
	var mealsServer;

	beforeEach(angular.mock.module('cbmApp'));
	
	beforeEach(inject(function(_mealsServer_) {
		mealsServer = _mealsServer_;
	}));

	it('should pass a simple test: true = true', function() {
    	expect(true).to.equal(true);
  	});

	it('should have a working meals-server service', function() {
		expect(mealsServer).to.exist;
	});

	it('should have a working user-factory service', inject(function(userFactory) {
		expect(userFactory).to.exist;
	}));

	it('should have a working file-reader service', inject(function(fileReader) {
		expect(fileReader).to.exist;
	}));

});
