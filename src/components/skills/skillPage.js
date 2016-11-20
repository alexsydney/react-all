"use strict";

var React = require('react');
var SkillApi = require('../../api/skillApi');

var Skills = React.createClass({
    // Lifecycle methods
    getInitialState: function() {
        return {
            skills: [] // Initial state when no skills
        };
    },
    // Retrieve data from Mock API and use setter to set the state
    componentWillMount: function() {
        // Synchronous call since Mock API with hard coded data
        this.setState({skills: SkillApi.getAllSkills()});
    },
    // Dynamic data from Mock API displayed
    render: function () {
        var createSkillRow = function(skill) {
            return (
                <div className="row" key={skill.id}>
                    <div className="col-xs-6">
                        <a href={"/#skills/" + skill.id}>{skill.id}</a>
                    </div>
                    <div className="col-xs-6">
                        {skill.skillName}
                    </div>
                </div>
            );
        };
        return (
            <div>
                <h1>Skills</h1>
                <div className="row">
                    <div className="col-xs-6"><strong>ID</strong></div>
                    <div className="col-xs-6"><strong>Skill Name</strong></div>
                </div>
                {/* Call method to iterate through skills */}
                {this.state.skills.map(createSkillRow, this)}
            </div>
        );
   }
});

module.exports = Skills;