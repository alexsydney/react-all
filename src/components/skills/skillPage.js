"use strict";

var React = require('react');

// Interact with Mock API via Flux Actions and Store instead of directly
var SkillActions = require('../../flux/actions/actionsSkill');
var SkillStore = require('../../flux/stores/storeSkill');

var Router = require('react-router');
var Link = Router.Link;

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

    // Dynamic data from Mock API displayed
    render: function () {
        return (
            <div>
                <h1>Skills</h1>
                <Link to="addSkill" className="btn btn-default">Add Skill</Link>
                {/* Compose SkillList (Child) Component by calling it and passing skills list from State to its Props*/}
                <SkillList skills={this.state.skills} />
            </div>
        );
   }
});

module.exports = SkillPage;