// Bootstrap app using Browserify
"use strict";

// IIFE overcomes jQuery not defined browser error when "use strict" used
(function(win) {
    return function () { win.$ = win.jQuery = require('jquery'); };
}(window));

// CommonJS Pattern
var React = require('react');
var Home = require('./components/homePage');
var About = require('./components/about/aboutPage');
var Skills = require('./components/skills/skillPage');
var Header = require('./components/common/header');

// Bundle and export module context
var Message = console.log('App was bootstrapped using Browserify and CommonJS');
module.exports = Message;

// Track child routes and render URL with appropriate markup.
var App = React.createClass({
   render: function () {
       var Child;

       switch(this.props.route) {
           case 'about': Child = About; break;
           case 'skills': Child = Skills; break;
           default: Child = Home;
       }

       return (
           <div>
               <Header />
               <Child />
           </div>
       );
   }
});

// Define render function for route change
function render() {
    console.log("New Route: ", window.location.hash);
    var route = window.location.hash.substr(1);
    React.render(
                    <App route={route} />,
                    document.getElementById('app')
                );
}

// Watch for hash change in URL when rendering (i.e. localhost:9005/#about)
window.addEventListener('hashchange', render);
render();