'use strict';

require('angular/angular');
require('angular-route');
require('marked/lib/marked'); //marked/lib/marked
require('angular-marked');
//require('marked');

var cbmApp = angular.module('cbmApp',['ngRoute','hc.marked'])
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    })

    .config(['markedProvider', function(markedProvider) {
        markedProvider.setOptions({
            gfm: true,
            tables: true,
        });
    }]);

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


