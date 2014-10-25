'use strict';

require('angular/angular');
require('angular-route');

var cbmApp = angular.module('cbmApp',['ngRoute']);

//filters


//controllers
require('./controllers/cbm-main-controller')(cbmApp);
require('./controllers/meal-list-controller')(cbmApp);
require('./controllers/cbm-admin-controller')(cbmApp);

//services
require('./services/meals-server')(cbmApp);

//directives


//routes
require('./routes/cbm-routes')(cbmApp);