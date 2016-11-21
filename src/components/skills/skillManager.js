"use strict";

var React = require('react');
var SkillForm = require('./skillForm');

var SkillManager = React.createClass({
    // Lifecycle methods

    // Define initial State to contain object called skill
    getInitialState: function() {
        return {
            skill: {
                id: '',
                skillName: '',
                skillCategory: ''
            } // Initial state when no skills
        };
    },
    /**
     *  Input Field Change Handler called on each key press to update the State on this Parent Component.
     *  It takes event references bubbled up from Child Component then Updates Field State that
     *  was passed with data value, and lastly call setState to update State of the
     *  Skill Object to the updated Field State. We first need to pass reference of State to the Child Component
     *  along with an Event Change Handler onChange. In the Child Component we need to use the onChange handler.
     */
    setSkillState: function(event) {
        var field = event.target.name;
        var value = event.target.value;
        this.state.skill[field] = value;
        return this.setState({skill: this.state.skill});
    },
    render: function() {
        {/* Controller View calls Child Form */}
        {/* Pass initial State data to Child Form Component via Props */}
        return (

            <SkillForm
                skill={this.state.skill}
                onChange={this.setSkillState}/>
        );
    }
});

module.exports = SkillManager;