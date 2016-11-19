// Bootstrap app using Browserify and CommonJS Pattern

// Add jQuery to global namespace
$ = jQuery = require('jquery');
var React = require('react');
var Home = require('./components/homePage');

var App = console.log('App was bootstrapped using Browserify and CommonJS');

// Bundle and export module context
module.exports = App;

React.render(<Home />, document.getElementById('app'));