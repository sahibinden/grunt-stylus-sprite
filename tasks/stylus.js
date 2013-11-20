/*
* Copyright 2013 Sahibinden Bilgi Teknolojileri Pazarlama ve Ticaret A.Ş.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

module.exports = function(grunt) {
    grunt.registerMultiTask('stylus', 'Compile stylus files.', function() {
        this.requiresConfig('stylus');

        var stylus = require('stylus');
        var endTask = this.async();
        var options = this.options({
            customize: function (filename, stylus, s) {},
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

                if (grunt.spriteHelper) {
                    s.define('sprite', grunt.spriteHelper.fn);
                }

                options.customize(filename, stylus, s);

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
