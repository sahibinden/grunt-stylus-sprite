# grunt-stylus-sprite

> Compiles Stylus files and generates sprites using [node-sprite](https://github.com/naltatis/node-sprite).

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-stylus-sprite --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-stylus-sprite');

```

## Usage

In your project's Gruntfile, add sections `sprite` and `stylus` to the data object passed into `grunt.initConfig()` as shown in the example below. The `sprite` task must run at least once before the `stylus` task because the `stylus` task uses the output of the `sprite` task.

```js
grunt.initConfig({
  sprite: {
    options: {
      imagePath: 'app/img',
      imageHttpPath: '/assets',
    },
    build: {}
  },
  stylus: {
    options: {
      banner: '/* This is an example CSS file */',
      includePath: 'app/styles',
    },
    build: {
      files: {
        'build/css/example.css': ['app/styles/example.styl'],
      }
    }
  }
})
```


## The "sprite" task

This task generates sprites using [node-sprite](https://github.com/naltatis/node-sprite). After generating the sprites, a property of the `grunt` object is set, i.e. `grunt.spriteHelper` which contains a custom Stylus function that allows defining sprites in Stylus.

### Options

#### options.imagePath
Type: `String`
Default value: `null`

A path that contains the images to generate sprites. Each sprite should be in its own directory as required by [node-sprite](https://github.com/naltatis/node-sprite).

#### options.imageHttpPath
Type: `String`
Default value: `null`

Base path to use while generating CSS for sprite image URLs.


## The "stylus" task

This task compiles Stylus files. Additionally, it uses a property defined in the `grunt` object, i.e. `grunt.spriteHelper` which contains a custom Stylus function that allows defining sprites in Stylus.

### Options

#### options.includePath
Type: `String`
Default value: `null`

Stylus include path.

#### options.banner
Type: `String`
Default value:

A string that is added to the beginning of the compiled CSS file.

#### options.compress
Type: `boolean`
Default value: `true`

Enable or disable CSS compression.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
- 1.0.2 - Add stylus options: firebug and linenos.
- 1.0.1 - Minor fixes.
- 1.0.0 - Initial release.
