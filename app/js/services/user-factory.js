'use strict';

module.exports = function(app) {
	app.factory('userFactory', function($http, API_URL, authTokenFactory, $q) {

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
	            authTokenFactory.setToken(response.data.token);
	        return response;
	        });
	    }

	    function logout() {
	        authTokenFactory.setToken();
	    }

	    function getUser() {
	        if (authTokenFactory.getToken()) {
	            return $http.get(API_URL + '/admin');
	        } else {
	            return $q.reject({ data: 'client has no auth token' });
	        }
	    }
	});
};