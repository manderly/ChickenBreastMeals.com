var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

describe('Testing testing', function(){
  it('should pass a simple test: true = true', function() {
    expect(true).to.equal(true);
  });
});

describe('REST API', function() {
  var baseUrl = 'http://localhost:3000';

  it('should get 200 on connect', function(done) {
    chai.request(baseUrl)
      .get('/')
      .res(function(res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});