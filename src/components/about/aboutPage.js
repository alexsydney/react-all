"use strict";

var React = require('react');

var About = React.createClass({
    // Static Methods
    statics: {
        willTransitionTo: function (transition, params, query, callback) {
            if(!confirm('Are you you over 18?')) {
                transition.abort();
            } else {
                callback();
            }
        },
        willTransitionFrom: function (transition, component) {
            if(!confirm('Did you read about us?')) {
                transition.abort();
            }
        }
    },
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