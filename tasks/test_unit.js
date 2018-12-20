var assert = require('assert');

describe('Basic Mocha String Test', function() {
    if('should return number of charachters in a string', function() {
        assert.equal('Hello'.length, 4);
    });

    if('should return first charachter of the string', function() {
        assert.equal("Hello".charAt(0), 'H')
    });
});