'use strict';

require('angular/angular');
require('angular-route');

/* todo: move this to its own file */
var fileReader = function ($q, $log) {
  var onLoad = function(reader, deferred, scope) {
    return function () {
      scope.$apply(function () {
        deferred.resolve(reader.result);
      });
    };
  };

  var onError = function (reader, deferred, scope) {
    return function () {
      scope.$apply(function () {
        deferred.reject(reader.result);
      });
    };
  };

  var onProgress = function(reader, scope) {
    return function (event) {
      scope.$broadcast("fileProgress",
        {
          total: event.total,
          loaded: event.loaded
        });
    };
  };

  var getReader = function(deferred, scope) {
    var reader = new FileReader();
    reader.onload = onLoad(reader, deferred, scope);
    reader.onerror = onError(reader, deferred, scope);
    reader.onprogress = onProgress(reader, scope);
    return reader;
  };

  var readAsDataURL = function (file, scope) {
    var deferred = $q.defer();
    var reader = getReader(deferred, scope);
    reader.readAsDataURL(file);

    return deferred.promise;
  };

  return {
    readAsDataUrl: readAsDataURL
  };
};

var cbmApp = angular.module('cbmApp',['ngRoute'], function config($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});

//filters


//controllers
require('./controllers/cbm-main-controller')(cbmApp);
require('./controllers/cbm-admin-controller')(cbmApp);
require('./controllers/cbm-recipe-controller')(cbmApp);
require('./controllers/cbm-login-controller')(cbmApp);
//services
require('./services/meals-server')(cbmApp);

//directives
require('./directives/admin-edit-meal-form')(cbmApp);
require('./directives/main-meal-details')(cbmApp);
require('./directives/main-meal-list')(cbmApp);
require('./directives/ng-file-select')(cbmApp);

//routes
require('./routes/cbm-routes')(cbmApp);

//factories

cbmApp.constant('API_URL', 'http://localhost:3000');

cbmApp.factory("fileReader", ["$q", "$log", fileReader]);

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
