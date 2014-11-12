'use strict';

module.exports = function(app) {
	app.factory('userFactory', function($http, authTokenFactory, $q) {

	    return {
	        login: login,
	        logout: logout,
	        getUser: getUser
	    };

	    function login(username, password) {
	        return $http.post('/login', {
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
	            return $http.get('/admin');
	        } else {
	            return $q.reject({ data: 'client has no auth token' });
	        }
	    }
	});
};