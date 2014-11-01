'use strict';

var express = require('express');
var multer = require('multer');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var app = express();

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/meals-development');
app.use(express.static(__dirname + '/build'));

app.use(bodyparser.json({limit:'50mb'}));
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));


app.use(multer({
	dest: './uploads'
}));

require('./routes/admin-routes')(app);

var server = http.createServer(app);

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening on " + port);
});
