'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var http = require('http');
var app = express();

app.use(express.static(__dirname + '/build'));
app.use(bodyparser.json());
var server = http.createServer(app);

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening on " + port);
})
