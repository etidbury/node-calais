var should = require('should');
var Calais = require('../lib/calais').Calais;

var someApiKey = '';

describe('Calais fetch', function() {
  it('should return 401 if no api key is provided', function(done) {
    this.timeout(5000);

    var calais = new Calais();

    calais.fetch(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should return 200', function(done) {
    this.timeout(5000);

    var calais = new Calais(someApiKey, {
      content: 'Microsoft Apple Google San-Francisco New York Cluj-Napoca'
    });

    calais.fetch(function(err) {
      if(err) {
        return done(err);
      }
      done();
    });
  });
});
