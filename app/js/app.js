'use strict';

require('angular/angular');
require('angular-route');

var cbmApp = angular.module('cbmApp',['ngRoute'], function config($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});

//controllers
require('./controllers/cbm-main-controller')(cbmApp);
require('./controllers/cbm-admin-controller')(cbmApp);
require('./controllers/cbm-recipe-controller')(cbmApp);
require('./controllers/cbm-login-controller')(cbmApp);

//services
require('./services/meals-server')(cbmApp);
require('./services/file-reader')(cbmApp);

//directives
require('./directives/admin-edit-meal-form')(cbmApp);
require('./directives/main-meal-details')(cbmApp);
require('./directives/main-meal-list')(cbmApp);
require('./directives/ng-file-select')(cbmApp);

//routes
require('./routes/cbm-routes')(cbmApp);


cbmApp.constant('API_URL', 'http://localhost:3000');

//factories 

//removal candidates
//cbmApp.factory("fileReader", ["$q", "$log"]);
//cbmApp.factory("fileReader", ["$q", "$log", fileReader]);

cbmApp.factory('UserFactory', function UserFactory($http, API_URL, AuthTokenFactory, $q) {
    return {
        login: login,
        logout: logout,
        getUser: getUser
    };

    function login(username, password) {
        return $http.post(API_URL + '/login', {
            username: username,
            password: password
        }).then(function success(response) {
            AuthTokenFactory.setToken(response.data.token);
        return response;
        });
    }

    function logout() {
        AuthTokenFactory.setToken();
    }

    function getUser() {
        if (AuthTokenFactory.getToken()) {
            return $http.get(API_URL + '/me');
        } else {
            return $q.reject({ data: 'client has no auth token' });
        }
    }
});

cbmApp.factory('AuthTokenFactory', function AuthTokenFactory($window) {
    var store = $window.localStorage;
    var key = 'auth-token';

    return {
        getToken: getToken,
        setToken: setToken
    };

    function getToken() {
        return store.getItem(key);
    }

    function setToken(token) {
        if (token) {
            store.setItem(key, token);
        } else {
            store.removeItem(key);
        }
    }
});

cbmApp.factory('AuthInterceptor', function AuthInterceptor(AuthTokenFactory) {
    return {
        request: addToken
    };

    function addToken(config) {
        var token = AuthTokenFactory.getToken();
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
    }

});
