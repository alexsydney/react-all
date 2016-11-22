"use strict";

var React = require('react');

// Interact with Mock API via Flux Actions and Store instead of directly
var SkillActions = require('../../flux/actions/actionsSkill');
var SkillStore = require('../../flux/stores/storeSkill');

var Router = require('react-router');
var Link = Router.Link;

var toastr = require('toastr');

// Delegate handling of markup down to Child Component
var SkillList = require('./skillList');

var SkillPage = React.createClass({
    // Lifecycle methods
    getInitialState: function() {
        return {
            // Flux Store provides initial empty array state when no skills or list of stored skills
            skills: SkillStore.getAllSkills()
        };
    },

    // Consume Public Flux Store API calls to add listener for passed callback when this Component is mounted
    componentWillMount: function() {
        SkillStore.addChangeListener(this._onChange);
    },

    // Consume Public Flux Store API calls to remove listener of passed callback when this Component is unmounted
    componentWillUnmount: function() {
        SkillStore.removeChangeListener(this._onChange);
    },

    // Run and Set State whenever Flux Store data changes
    _onChange: function() {
        console.log("Flux Status: React View - React Component with added Flux Store Change Event Listener called due to Flux Store delete data change");
        this.setState({ skills: SkillStore.getAllSkills() });
    },

    deleteSkill: function(id, event) {
        console.log("Flux Status: React View - Delete skill requested with id: " + id);
        event.preventDefault();
        SkillActions.deleteSkill(id);
        toastr.success('Skill deleted');
    },

    // Dynamic data from Mock API displayed
    render: function () {
        return (
            <div>
                <h1>Skills</h1>
                <Link to="addSkill" className="btn btn-default">Add Skill</Link>
                {/* Compose SkillList (Child) Component by calling it and passing skills list from State to its Props*/}
                <SkillList
                    skills={this.state.skills}
                    onDelete={this.deleteSkill} />
            </div>
        );
   }
});

module.exports = SkillPage;