module.exports = function(grunt) {
    grunt.registerMultiTask('sprite', 'Generate sprites.', function() {
        this.requiresConfig('sprite');

        var sprite = require('node-sprite');

        var endTask = this.async();
        var options = this.options({
            imagePath: null,
            imageHttpPath: null
        });

        // use node-sprite's stylus support to generate sprites
        sprite.stylus({path: options.imagePath, httpPath: options.imageHttpPath}, function(err, helper) {
            if (err) {
                throw err;
            }
            grunt.spriteHelper = helper;
            endTask();
        });
    });
};
