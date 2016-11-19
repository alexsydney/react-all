"use strict";

// Bootstrap app using Browserify and CommonJS Pattern

// IIFE overcomes jQuery is not defined browser error when "use strict" in this file
(function(win) {
    return function () { win.$ = win.jQuery = require('jquery'); };
}(window));

var React = require('react');
var Home = require('./components/homePage');
var About = require('./components/about/aboutPage');

// Bundle and export module context
var Message = console.log('App was bootstrapped using Browserify and CommonJS');
module.exports = Message;

/**
 *  Track child routes and render depending on URL.
 *  Check properties and route for the app.
 *  Render appropriate markup
 */
var App = React.createClass({
   render: function () {
       var Child;

       switch(this.props.route) {
           case 'about': Child = About; break;
           default: Child = Home;
       }

       return (
           <div>
               <Child />
           </div>
       );

   }
});

/**
 *  Define render function for route change
 */
function render() {
    console.log("New Route: ", window.location.hash);
    var route = window.location.hash.substr(1);
    React.render(
                    <App route={route} />,
                    document.getElementById('app')
                );
}

/**
 *  Watch for hash change in URL when rendering (i.e. localhost:9005/#about)
 */
window.addEventListener('hashChange', render);
render();