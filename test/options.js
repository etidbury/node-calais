var assert = require('assert');
var Calais = require('../lib/calais').Calais;

var some_api_key = 'KEY';

describe("Calais options", function() {
  it('should set the api key', function () {
    var calais = new Calais(some_api_key);
    calais.apiKey.should.equal(some_api_key);
  });

  it('should set option', function () {
    var calais = new Calais(some_api_key, {'language': 'French'});
    calais.options.language.should.equal('French');
  });
});
