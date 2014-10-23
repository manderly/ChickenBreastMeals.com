'use strict';

var express = require('express');
var http = require('http');
var app = express();

var server = http.createServer(app);

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening on " + port);
})
