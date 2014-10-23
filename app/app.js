'use strict';

require('angular/angular');
require('angular-route');
require('angular-base64');
require('angular-cookies');

var cbmApp = angular.module('cbmApp',['ngRoute','ngCookies','base64']);

//filters


//controllers
require('./controllers/cbm-main-controller')(cbmApp);

//services


//directives


//routes
