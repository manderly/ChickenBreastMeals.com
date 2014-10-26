'use strict';

require('angular/angular');
require('angular-route');

var cbmApp = angular.module('cbmApp',['ngRoute']);

//filters


//controllers
require('./controllers/cbm-main-controller')(cbmApp);
require('./controllers/cbm-admin-controller')(cbmApp);

//services
require('./services/meals-server')(cbmApp);

//directives
require('./directives/new-meal-form')(cbmApp);
require('./directives/main-meal-details')(cbmApp);
require('./directives/main-meal-list')(cbmApp);

//routes
require('./routes/cbm-routes')(cbmApp);