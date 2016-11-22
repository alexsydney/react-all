"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../../constants/flux/typesSkill.js');
var SkillApi = require('../../api/skillApi');

// Define Actions for Skill Component
var SkillActions = {

    /**
     *  "Action Creator" - Define Action Creator helper method that wraps the
     *  creation and dispatch of Action Payloads
     */
    createSkill: function(skill) {

        // Call Mock API and pass received skill parameter to get skill
        var newSkill = SkillApi.saveSkill(skill);

        /**
         *  "Action Payload" - Dispatch the Action Payload with call notifying all Flux Stores that
         *  an Action was just created containing a defined Action Type and Data (skill data).
         *  Action Type must remain in sync with Flux Stores so use a Constants File listing
         *  all Action Types used in the app
         */
        Dispatcher.dispatch({
            actionType: ActionTypes.CREATE_SKILL,   // Action Type
            skill: newSkill                         // Action Data
        });
    },

    updateSkill: function(skill) {

        var updatedSkill = SkillApi.saveSkill(skill);

        Dispatcher.dispatch({
            actionType: ActionTypes.UPDATE_SKILL,   // Action Type
            skill: updatedSkill                     // Action Data
        });
    },

    deleteSkill: function(id) {
        // debugger; // Breakpoints for browser
        console.log("Flux Status: Actions - Called skill Action to Delete skill with id " + id + " and dispatching to Flux Store");

        SkillApi.deleteSkill(id);

        Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_SKILL,   // Action Type
            id: id                                  // Action Data
        });
    }

};

module.exports = SkillActions;