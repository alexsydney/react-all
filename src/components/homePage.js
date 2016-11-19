// Browser evaluate JS in strict mode
"use strict";

// Import React using CommonJS Pattern
var React = require('react');

var Home = React.createClass({

    // Define React component in JSX
    render: function () {
        return (
            <div className="jumbotron">
                <h1>Intro</h1>
                <p>Paragraph</p>
            </div>
        );
    }
});

module.exports = Home;