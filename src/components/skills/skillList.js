"use strict";

var React = require('react');
var Link = require('react-router').Link;

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
                    <div className="col-xs-2">
                        <Link to="editSkill" params={{id: skill.id}}>{skill.id}</Link>
                    </div>
                    <div className="col-xs-4">
                        {skill.skillCategory}
                    </div>
                    <div className="col-xs-4">
                        {skill.skillName}
                    </div>
                    <div className="col-xs-2">
                        <Link to="skills" onClick={this.props.onDelete.bind(null, skill.id)}>
                            <span className="glyphicon glyphicon-remove-sign"></span>
                        </Link>
                    </div>
                </div>
            );
        };
        return (
            <div>
                <div className="row">
                    <div className="col-xs-2"><strong>ID</strong></div>
                    <div className="col-xs-4"><strong>Skill Category</strong></div>
                    <div className="col-xs-4"><strong>Skill Name</strong></div>
                    <div className="col-xs-2"></div>
                </div>
                {/* Call method to iterate through skills */}
                {/* Child receives Props (NOT State) */}
                {this.props.skills.map(createSkillRow, this)}
            </div>
        );
    }
});

module.exports = SkillList;