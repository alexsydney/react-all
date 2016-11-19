// Bootstrap app using Browserify and CommonJS Pattern

// Add jQuery to global namespace
$ = jQuery = require('jquery');

var App = console.log('App was bootstrapped using Browserify and CommonJS');

// Bundle and export module context
module.exports = App;