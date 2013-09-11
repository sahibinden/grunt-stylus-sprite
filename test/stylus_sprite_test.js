'use strict';

var grunt = require('grunt');

exports.stylus_sprite = {
  default_options: function(test) {
    var actual = grunt.file.read('tmp/test.css');
    var expected = grunt.file.read('test/expected/test.css');
    test.equal(actual, expected, 'should be equal.');

    test.done();
  },
};
