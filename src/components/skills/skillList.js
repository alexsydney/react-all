"use strict";

var React = require('react');

// Child sent data from Parent (not API)

var SkillList = React.createClass({
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
                <div className="row">
                    <div className="col-xs-6"><strong>ID</strong></div>
                    <div className="col-xs-6"><strong>Skill Name</strong></div>
                </div>
                {/* Call method to iterate through skills */}
                {/* Child receives Props (NOT State) */}
                {this.props.skills.map(createSkillRow, this)}
            </div>
        );
    }
});

module.exports = SkillList;