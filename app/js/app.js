'use strict';

require('angular/angular');
require('angular-route');

var cbmApp = angular.module('cbmApp',['ngRoute'])
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });

var marked = require('marked/lib/marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

console.log(marked('I am using __markdown__.'));

//controllers
require('./controllers/cbm-main-controller')(cbmApp);
require('./controllers/cbm-admin-controller')(cbmApp);
require('./controllers/cbm-recipe-controller')(cbmApp, marked);
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


