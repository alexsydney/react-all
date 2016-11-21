// Browser evaluate JS in strict mode
"use strict";

// Import React using CommonJS Pattern
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Home = React.createClass({

    // Define React component in JSX
    render: function () {
        return (
            <div className="jumbotron">
                <h1>Administration</h1>
                <p>Welcome to the skills administration section</p>
                <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
            </div>
        );
    }
});

module.exports = Home;