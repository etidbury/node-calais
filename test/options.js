var Calais = require('../lib/calais').Calais;

var someApiKey = 'KEY';

describe('Calais options', function() {
  it('should set the api key', function () {
    var calais = new Calais(someApiKey);
    calais.apiKey.should.equal(someApiKey);
  });

  it('should set option', function () {
    var calais = new Calais(someApiKey, {'language': 'French'});
    calais.options.language.should.equal('French');
  });
});
