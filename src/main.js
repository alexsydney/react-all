// Bootstrap app using Browserify
"use strict";

// CommonJS Pattern
var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

/**
 *  Run React Router passing function that takes handler as parameter
 *  renders it on the referenced app placeholder (in index.html where React App is hosted)
 *  for the handler currently in scope based on URL
 */
Router.run(routes, function(Handler) {
   React.render(
       <Handler />,
       document.getElementById('app')
   );
});