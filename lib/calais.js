/*!
 * calais
 * Copyright(c) 2011 Mike Cantelon
 * Modified 2013 Harry Guillermo (github: hguillermo)
 * MIT Licensed
 */

var request = require('request');

var Calais = function (apiKey, options) {
  this.initialize(apiKey, options);
};

Calais.prototype = {

  initialize: function (apiKey, options) {

    this.apiKey = apiKey;

    this.defaults = {
      'apiHost'                : 'api.thomsonreuters.com',
      'apiPath'                : '/permid/calais',
      'contentType'            : 'text/raw',
      'outputFormat'           : 'application/json',
      'language'               : 'English',
      'proxy'                  : '',
      'content'                : ''
    };

    this._setDefaultOptions(options);
  },

  _setDefaultOptions: function (options) {
    options = options || {};
    this.options = {};

    var keys = Object.keys(this.defaults);
    for (var i = 0, l = keys.length; i < l; i++) {
      var index = keys[i];
      this.options[index] = (this._undefinedOrNull(options[index])) ?
        this.defaults[index]
        : options[index];
    }
  },

  _undefinedOrNull: function (value) {
    return value === undefined || value === null;
  },

  set: function (key, value) {
    this.options[key] = value;
  },

  validateOptions: function () {
    return true;
  },

  cleanResult: function (result) {
    var cleanResult = [];
    for (var i in result) {
      if (i !== 'doc') {
        cleanResult.push(result[i]);
      }
    }
    return cleanResult;
  },

  fetch: function (callback) {
    var calais = this;

    if (this.validateOptions()) {
      var params = {
        'Host'                   : this.options.apiHost,
        'x-ag-access-token'      : this.apiKey,
        'x-calais-language'      : this.options.language,
        'Content-Type'           : this.options.contentType,
        'Accept'                 : this.options.outputFormat,
        'outputFormat'           : this.options.outputFormat,
        'Content-Length'         : this.options.content.length
      };

      var options = {
        uri    : 'https://' + this.options.apiHost + this.options.apiPath,
        method : 'POST',
        body   : this.options.content,
        headers: params
      };

      //ensure the proxy is set
      if (this.options.proxy) {
        options.proxy = this.options.proxy;
      }

      request(options, function (error, response, calaisData) {
        if (error) {
          return callback(error);
        }

        if (response === undefined) {
          return callback(new Error('Open Calais http response is undefined'));
        } else {
          var err = null;
          // take note of whether Javascript object output was returned
          var isJsonOutput = response.headers['content-type'].indexOf('application/json') === 0;

          // parse to a Javascript object
          var result = (isJsonOutput) ? JSON.parse(calaisData) : calaisData;

          if (response.statusCode === 200) {
            // ignore cleanResult preference if not requesting an object
            result = (isJsonOutput && calais.options.cleanResult) ? calais.cleanResult(result) : result;
          } else if(result.fault && result.fault.faultstring) {
            err = new Error(result.fault.faultstring);
          } else {
            err = new Error('Open Calais http response error ' + response.statusCode);
          }

          return callback(err, result);
        }
      });
    }
  }
};

exports.Calais = Calais;
