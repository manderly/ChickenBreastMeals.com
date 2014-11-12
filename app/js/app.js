'use strict';

require('angular/angular');
require('angular-route');

var cbmApp = angular.module('cbmApp',['ngRoute'], function config($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});

//controllers
require('./controllers/cbm-main-controller')(cbmApp);
require('./controllers/cbm-admin-controller')(cbmApp);
require('./controllers/cbm-recipe-controller')(cbmApp);
require('./controllers/cbm-login-controller')(cbmApp);

//services
require('./services/meals-server')(cbmApp);
require('./services/file-reader')(cbmApp);
require('./services/user-factory')(cbmApp);
require('./services/auth-interceptor')(cbmApp);
require('./services/auth-token-factory')(cbmApp);

//directives
require('./directives/admin-edit-meal-form')(cbmApp);
require('./directives/main-meal-details')(cbmApp);
require('./directives/main-meal-list')(cbmApp);
require('./directives/ng-file-select')(cbmApp);

//routes
require('./routes/cbm-routes')(cbmApp);

//cbmApp.constant('API_URL', 'http://localhost:3000');
cbmApp.constant('API_URL', '/');

