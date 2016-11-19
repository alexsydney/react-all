"use strict";

var React = require('react');

var About = React.createClass({
    render: function () {
        return (
            <div>
                <h1>About</h1>
                <p>
                    Paragraph
                    <ul>
                        <li>Item 1</li>
                        <li>Item 2</li>
                    </ul>
                </p>
            </div>
        );
    }
});

module.exports = About;