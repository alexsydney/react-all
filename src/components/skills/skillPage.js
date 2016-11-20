"use strict";

var React = require('react');
var SkillApi = require('../../api/skillApi');

// Delegate handling of markup down to Child Component
var SkillList = require('./skillList');

var Skills = React.createClass({
    // Lifecycle methods
    getInitialState: function() {
        return {
            skills: [] // Initial state when no skills
        };
    },
    // Retrieve data from Mock API and use setter to set the state
    componentDidMount: function() {
        // Best practice
        if (this.isMounted()) {
            // Synchronous call since Mock API with hard coded data
            this.setState({skills: SkillApi.getAllSkills()});
        }
    },
    // Dynamic data from Mock API displayed
    render: function () {
        return (
            <div>
                <h1>Skills</h1>
                {/* Call SkillList (Child) Component passing skills list from State to its Props*/}
                <SkillList skills={this.state.skills} />
            </div>
        );
   }
});

module.exports = Skills;