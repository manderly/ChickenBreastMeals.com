exports.config = {

	seleniumAddress: 'http://localhost:4444/wd/hub',

	specs: ['test/e2e/*.js'],

	baseUrl: 'http://localhost:3000',

	rootElement: '.cbm-app',

	jasmineNodeOpts: {
		onComplete: null,
		isVerbose: true,
		showColors: true,
		includeStackTrace: true
	}
};
