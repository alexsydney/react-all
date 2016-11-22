"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../../constants/flux/typesSkill.js');
var SkillApi = require('../../api/skillApi');

// Define "Action Creators" to bootstrap app with
var InitialiseActions = {

    initApp: function() {
        Dispatcher.dispatch({
            actionType: ActionTypes.INITIALISE,
            initialData: {
                skills: SkillApi.getAllSkills()
            }
        });
    }
};

module.exports = InitialiseActions;