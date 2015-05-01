exports.config = {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,

  capabilities: {
      'browserName': 'chrome',
      'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
      'build': process.env.TRAVIS_BUILD_NUMBER,
      'name': 'ngValidation Protractor Tests'
    },

	seleniumAddress: 'http://localhost:4444/wd/hub',

	specs: ['test/e2e/*.js'],

	baseUrl: 'http://localhost:' + (process.env.HTTP_PORT || '3000'),

	rootElement: '.cbm-app',

	jasmineNodeOpts: {
		onComplete: null,
		isVerbose: true,
		showColors: true,
		includeStackTrace: true,
    defaultTimeoutInterval: 30000
	}
};
