'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var jwtSecret = 'fjkdlsajfoew239053/3uk';
var user = {
	username: 'cbmadmin',
	password: 'p'
}

var app = express();

app.use(cors());
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/meals-development');
app.use(express.static(__dirname + '/build'));

app.use(bodyparser.json({limit:'50mb'}));
app.use(bodyparser.urlencoded({limit: '50mb', extended: true}));

//app.use(expressJwt({ secret: jwtSecret }).unless({ path: [ '/login' ]}));

/*
app.get('/login',expressJwt({secret:jwtSecret}),
	function(req,res) {
		if(!req.user.admin) return res.send(401);
		res.send(200);
});
*/

require('./routes/admin-routes')(app);

var server = http.createServer(app);

app.post('/login', authenticate, function (req, res) {
  var token = jwt.sign({
    username: user.username
  }, jwtSecret);
  res.send({
    token: token,
    user: user
  });
});

app.get('/me', function (req, res) {
  res.send(req.user);
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening on " + port);
});

function authenticate(req, res, next) {
  var body = req.body;
  if (!body.username || !body.password) {
    res.status(400).end('Must provide username or password');
  } else if (body.username !== user.username || body.password !== user.password) {
    res.status(401).end('Username or password incorrect');
  } else {
    next();
  }
}