"use strict";

var React = require('react');
var Router = require('react-router');
var SkillForm = require('./skillForm');

// Interact with Mock API via Flux Actions and Store instead of directly
var SkillActions = require('../../flux/actions/actionsSkill');
var SkillStore = require('../../flux/stores/storeSkill');

var toastr = require('toastr');

var SkillManager = React.createClass({
    // Mixins
    mixins: [
        Router.Navigation
    ],

    // Static methods when loading/unloading
    statics: {
        willTransitionFrom: function(transition, component) {
            if (component.state.dirty && !confirm('Leave without saving?')) {
                transition.abort();
            }
        }
    },

    // Lifecycle methods

    // Define initial State to contain object called skill
    getInitialState: function() {
        return {
            // Initial state when no skills
            skill: {
                id: '',
                skillName: '',
                skillCategory: ''
            },
            errors: {},
            dirty: false
        };
    },
    componentWillMount: function() {
        // React Router passes the params down via Props
        var skillId = this.props.params.id; // from path '/skill/:id'

        /**
         *  Check the skillId exists in the URL parameters
         *  and if so perform call to Skill API to retrieve the skill for the
         *  provided skillId and then set the skill State to the response
         */
        if (skillId) {
            this.setState({skill: SkillStore.getSkillById(skillId)});
        }
    },
    /**
     *  Input Field Change Handler called on each key press to update the State on this Parent Component.
     *  It takes event references bubbled up from Child Component then Updates Field State that
     *  was passed with data value, and lastly call setState to update State of the
     *  Skill Object to the updated Field State. We first need to pass reference of State to the Child Component
     *  along with an Event Change Handler onChange. In the Child Component we need to use the onChange handler.
     */
    setSkillState: function(event) {
        this.setState({dirty: true});
        var field = event.target.name;
        var value = event.target.value;
        this.state.skill[field] = value;
        return this.setState({skill: this.state.skill});
    },
    // Validation of form
    skillFormIsValid: function() {
        var formIsValid = true;

        // Use State to track errors that occur. Clear prior errors
        this.state.errors = {};

        if (this.state.skill.skillCategory.length < 3) {
            this.state.errors.skillCategory = 'Skill Category must be >3 characters';
            formIsValid = false;
        }

        if (this.state.skill.skillName.length < 3) {
            this.state.errors.skillName = 'Skill Name must be >3 characters';
            formIsValid = false;
        }

        // Always call setState when changing state
        this.setState({errors: this.state.errors});
        return formIsValid;
    },
    /**
     *  Save skill to Mock API (via Flux Store) accepts event parameter passed up from Child Component
     *  and pass down this saveSkill function to Child Component in render call using onSave
     *  (no DB is being hit and no AJAX calls are made to a server)
     */
    saveSkill: function(event) {
        event.preventDefault(); // prevent default browser behaviour of button actually submitting form

        if (!this.skillFormIsValid()) {
            return;
        }

        if (this.state.skill.id) {
            SkillActions.updateSkill(this.state.skill);
            toastr.success('Skill updated.');
        } else {
            SkillActions.createSkill(this.state.skill);
            toastr.success('Skill created.');
        }
        this.setState({dirty: false}); // Reset state of whether any input fields changed
        this.transitionTo('skills');
    },
    render: function() {
        {/* Controller View calls Child Form */}
        {/* Pass initial State data to Child Form Component via Props */}
        return (

            <SkillForm
                skill={this.state.skill}
                onChange={this.setSkillState}
                onSave={this.saveSkill}
                errors={this.state.errors} />
        );
    }
});

module.exports = SkillManager;