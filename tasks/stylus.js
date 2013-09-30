module.exports = function(grunt) {
    grunt.registerMultiTask('stylus', 'Compile stylus files.', function() {
        this.requiresConfig('stylus');

        var stylus = require('stylus'),
            nib = null;

        try {
            nib = require('nib');
        } catch(e) {
            // pass
        }

        var endTask = this.async();
        var options = this.options({
            includePath: null,
            banner: '',
            compress: true,
            firebug: false,
            linenos: false
        });

        // iterate over dest files sequentially
        grunt.util.async.forEachSeries(this.files, function(f, endDest) {

            // iterate over src files sequentially and accumulate results in an array
            var src = grunt.util.async.concatSeries(f.src, function(filename, endCompile) {

                // read the src stylus file
                var stylStr = grunt.file.read(filename);

                // run the stylus compiler with using node-sprite's helper function
                var s = stylus(stylStr)
                    .set('filename', filename)
                    .set('compress', options.compress)
                    .set('firebug', options.firebug)
                    .set('linenos', options.linenos)
                    .include(options.includePath);

                if (nib) {
                    s.use(nib());
                }

                if (grunt.spriteHelper) {
                    s.define('sprite', grunt.spriteHelper.fn);
                }

                s.render(function (err, css) {
                    if (err) {
                        throw err;
                    }

                    // signal that compilation is finished and return the result
                    endCompile(null, css);
                });
            }, function(err, compileResults) {
                if (err) {
                    throw err;
                }

                // write the dest file constructed from concatenating the compiled stylus files
                var destCss = options.banner + '\n' + compileResults.join('\n');
                grunt.file.write(f.dest, destCss);

                // signal that the dest file is written successfully
                endDest(null);
            });
        }, endTask);
    });
};
