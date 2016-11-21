"use strict";

var React = require('react');

// Child sent data from Parent (not API)

var SkillList = React.createClass({
    // Declare PropTypes in static object
    propTypes: {
        skills: React.PropTypes.array.isRequired // Require skills object
    },
    // Dynamic data from Mock API displayed
    render: function () {
        var createSkillRow = function(skill) {
            return (
                <div className="row" key={skill.id}>
                    <div className="col-xs-4">
                        <a href={"/#skills/" + skill.id}>{skill.id}</a>
                    </div>
                    <div className="col-xs-4">
                        {skill.skillCategory}
                    </div>
                    <div className="col-xs-4">
                        {skill.skillName}
                    </div>
                </div>
            );
        };
        return (
            <div>
                <div className="row">
                    <div className="col-xs-4"><strong>ID</strong></div>
                    <div className="col-xs-4"><strong>Skill Category</strong></div>
                    <div className="col-xs-4"><strong>Skill Name</strong></div>
                </div>
                {/* Call method to iterate through skills */}
                {/* Child receives Props (NOT State) */}
                {this.props.skills.map(createSkillRow, this)}
            </div>
        );
    }
});

module.exports = SkillList;