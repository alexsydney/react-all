"use strict";

var React = require('react');
var SkillForm = require('./skillForm');

var SkillManager = React.createClass({
    render: function() {
        {/* Controller View calls Child Form */}
        return (
            <SkillForm />
        );
    }
});

module.exports = SkillManager;