"use strict";

// IIFE overcomes jQuery not defined browser error when "use strict" used
(function(win) {
    return function () { win.$ = win.jQuery = require('jquery'); };
}(window));

// Bundle and export module context
var Message = console.log('React.js app was bootstrapped using Browserify and CommonJS');
module.exports = Message;

var React = require('react');
var Header = require('./common/header');
var RouteHandler = require('react-router').RouteHandler;

// Track child routes and render URL with appropriate markup.
var App = React.createClass({
    render: function () {
        return (
            <div>
                <Header />
                {/* React Router handles rendering appropriate Child Component for given URL */}
                <div className="container-fluid">
                    <RouteHandler />
                </div>
            </div>
        );
    }
});

module.exports = App;