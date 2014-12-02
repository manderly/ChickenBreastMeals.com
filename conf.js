exports.config = {
	rootElement: '.cbm-app',
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['test/mocha/e2e/integration-test.js']
}