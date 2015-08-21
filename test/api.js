var assert = require('assert');
var should = require('should');
var Calais = require('../lib/calais').Calais;

var some_api_key = '';

describe("Calais fetch", function() {
  it('should return 401 if no api key is provided', function(done) {
    this.timeout(5000);

    var calais = new Calais();

    calais.fetch(function(err, data) {
      should.exist(err);
      done();
    });
  });

  it('should return 200', function(done) {
    this.timeout(5000);

    var calais = new Calais(some_api_key, {
      content: 'Microsoft Apple Google San-Francisco New York Cluj-Napoca'
    });

    calais.fetch(function(err, data) {
      if(err) {
        return done(err);
      }
      done();
    });
  });
});
