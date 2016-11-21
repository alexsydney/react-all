"use strict";

var React = require('react');
var Router = require('react-router');
var SkillForm = require('./skillForm');
var SkillApi = require('../../api/skillApi');

var SkillManager = React.createClass({
    // Mixins
    mixins: [
        Router.Navigation
    ],

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
    /**
     *  Save skill to Mock API accepts event parameter passed up from Child Component
     *  and pass down this saveSkill function to Child Component in render call using onSave
     *  (no DB is being hit and no AJAX calls are made to a server)
     */
    saveSkill: function(event) {
        event.preventDefault(); // prevent default browser behaviour of button actually submitting form
        SkillApi.saveSkill(this.state.skill);
        this.transitionTo('skills');
    },
    render: function() {
        {/* Controller View calls Child Form */}
        {/* Pass initial State data to Child Form Component via Props */}
        return (

            <SkillForm
                skill={this.state.skill}
                onChange={this.setSkillState}
                onSave={this.saveSkill} />
        );
    }
});

module.exports = SkillManager;