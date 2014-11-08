require('es6-shim');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
chai.request.addPromises(global.Promise);

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

  it('should get 200 on connect', function(done) {
    chai.request(baseUrl)
      .get('/')
      .then(function(res) {
        expect(res).to.have.status(200);
        done();
      }, function(err){
        throw err;
      });
  });

  it('should have a tools page', function(done) {
    chai.request(baseUrl)
      .get('/#/tools')
      .then(function(res) {
        expect(res).to.have.status(200);
        done();
      }, function(err) {
        throw err;
      });
  });

  it('should have an about page', function(done) {
    chai.request(baseUrl)
      .get('/#/about')
      .then(function(res) {
        expect(res).to.have.status(200);
        done();
      }, function(err) {
        throw err;
      });
  });

  it('should have an admin page', function(done) {
    chai.request(baseUrl)
      .get('/#/admin')
      .then(function(res) {
        expect(res).to.have.status(200);
        done();
      }, function(err) {
        throw err;
      });
  });

  it('should have meals data as json', function(done) {
    chai.request(baseUrl)
      .get('/db')
      .then(function(res) {
        expect(res).to.be.json;
        done();
      }, function(err) {
        throw err;
      });
  });

  it('should be able to create a meal', function(done) {
    chai.request(baseUrl)
      .post('/db')
      .send(fakeMeal)
      .then(function(res) {
        expect(res.body).to.have.property('name');
        done();
      }, function(err) {
        throw err;
      });
  });
////
  //it should have meals count > 0
  //it should be able to create a meal, read a meal, edit a meal, delete a meal
  //a meal should have these parts: name, description, etc
  //an individual meal can be viewed on the recipe page

});