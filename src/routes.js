"use strict";

// Dependencies

var React = require('react');

// Specific router functions with reference to Router
var Router = require('react-router');

// Reference to Route Component that defines routes
var Route = Router.Route;

// Reference to DefaultRoute to declare route to load when page loads at root URL
var DefaultRoute = Router.DefaultRoute;

// Reference to NotFoundRoute Component that comes with React Router
var NotFoundRoute = Router.NotFoundRoute;

var Redirect = Router.Redirect;

// Define routing rules and Components that handle respective routes when called
var routes = (
    <Route name="app" path="/" handler={require('./components/app')}>
        <DefaultRoute handler={require('./components/homePage')} />
        <Route name="skills" handler={require('./components/skills/skillPage')} />
        <Route name="addSkill" path="skill" handler={require('./components/skills/skillManager')} />
        <Route name="about" handler={require('./components/about/aboutPage')} />
        <NotFoundRoute handler={require('./components/notFoundPage')} />
        {/* Redirect Subdirectories (Bad References) */}
        <Redirect from="skills/*" to="skills" />
        <Redirect from="about/*" to="about" />
    </Route>
);

module.exports = routes;