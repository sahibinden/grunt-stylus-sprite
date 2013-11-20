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
    grunt.registerMultiTask('sprite', 'Generate sprites.', function() {
        this.requiresConfig('sprite');

        var sprite = require('node-sprite');
        var endTask = this.async();
        var options = this.options();

        // use node-sprite's stylus support to generate sprites
        sprite.stylus(options, function(err, helper) {
            if (err) {
                throw err;
            }
            grunt.spriteHelper = helper;
            endTask();
        });
    });
};
