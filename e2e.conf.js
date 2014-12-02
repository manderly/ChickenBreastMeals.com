exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['test/mocha/e2e/*.js'],
	baseUrl: 'http://localhost:3000/',
	rootElement: '.cbm-app'
}