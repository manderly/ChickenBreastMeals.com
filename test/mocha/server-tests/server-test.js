require('es6-shim');
var chai = require('chai');
var request = require('request');

var expect = chai.expect;

var id;
var fakeMeal = {
  name:'Fake Meal',
  url:'fake-meal-url',
  snippet: 'fake meal snippet',
  description: 'fake meal description',
  tags: ['faketag1','faketag2'],
  skillLevel: 'easy',
  yield: 1,
  plural: 'fake meals',
  mealOptions: '{test}',
  prepTime: 5,
  cookTime: 5,
  ovenTemp: 425,
  ingredients: ['ingredient1', 'ingredient2'],
  steps: ['step1', 'step2'],
  image: 'imagepath',
  kCalPerServing: 500,
  kCalTotal: 1500,
  published: true,
  rating:5
};


describe('Testing testing', function(){
  it('should pass a simple test: true = true', function() {
    expect(true).to.equal(true);
  });
});

describe('REST API', function() {
  this.timeout(3000);
  var baseUrl = 'http://localhost:3000';

    it('should get 200 on connect', function (done) {
        request.get(baseUrl, function(err, res, body) {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });

    it('should have a tools page', function (done) {
        request.get(baseUrl + '/#/tools', function(err,res,body) {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });

    it('should have an about page', function (done) {
        request.get(baseUrl + '/#/about', function(err,res,body) {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });

    it('should have an admin page', function (done) {
        request.get(baseUrl + '/#/admin', function(err,res,body) {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });

    it('should have meals data as json', function (done) {
        request.get(baseUrl + '/db', function(err,res,body) {
            expect(res.statusCode).to.equal(200);
            expect(res).to.be.json;
            done();
        });
    });

    it('should POST a meal', function (done) {
        request.post({url:baseUrl + '/db', json:fakeMeal}, function(err,res,body) {
            expect(res.statusCode).to.equal(200);
            expect(body).to.have.property('name');
            expect(body.name).to.eql('Fake Meal');
            id = body._id;
            done();
        });
    });

    it('should GET a meal', function (done) {
        request.get({url:baseUrl + '/db', json:true}, function(err,res,body) {
            expect(res.statusCode).to.equal(200);
            expect(Array.isArray(body)).to.be.true;
            expect(body[0]).to.have.property('name');
            done(); 
        });
    });

    it('should GET the test meal', function (done) {
        request.get({url:baseUrl + '/db/getOne/' + id, json:true}, function(err,res,body) {
            expect(res.statusCode).to.equal(200);
            expect(body).to.have.property('name');
            expect(body.name).to.eql('Fake Meal');
            expect(body._id).to.eql(id);
            done();
        });
    });

    it('should PUT a name edit to the test meal', function (done) {
        request.put({url:baseUrl + '/db/' + id, json:{'name':'Fake Meal Updated'}}, function(err,res,body) {
            expect(res.statusCode).to.equal(200);
            expect(body.name).to.eql('Fake Meal Updated');
            expect(body._id).to.eql(id);
            done();
        });
    });

    it('should DELETE the test meal', function (done) {
        request.del({url:baseUrl + '/db/' + id, json:true}, function(err,res,body) {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });

    it('should confirm test meal was deleted', function (done) {
        request.get({url:baseUrl + '/db/getOne/' + id, json:true}, function(err,res,body) {
            expect(res.statusCode).to.equal(200);
            expect(body).to.equal(null);
            done();
        });
    });
});