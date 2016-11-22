"use strict";

// Import core libraries to create new Store

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../../constants/flux/typesSkill.js');

// Node.js EventEmitter broadcasts events from Stores to notify React Components
var EventEmitter = require('events').EventEmitter;

/**
 *  Extend the Flux Store to have Event Emitter capabilities using object-assign library
 *  that joins two objects and their properties together (i.e. SkillStore and EventEmitter prototype)
 *  https://www.npmjs.com/package/object-assign
 */
var assign = require('object-assign');

var _ = require('lodash');

var CHANGE_EVENT = 'change';

// Private variable to store data. Private as exported. Only change data in Flux Store via Public API
var _skills = [];

/**
 *  Public Store API functions.
 *  Extend the Flux Store using object-assign library by
 *  passing empty base object, and extend utilising:
 *      - EventEmitter.prototype parameter
 *      - block that defines the Store parameter
 *  Essentially this defines EventEmitter.prototype as the base class
 */
var SkillStore = assign({}, EventEmitter.prototype, {

    /**
     *  Define Flux Store providing three core helper functions for React Components to interact with it
     *  utilising the EventEmitter.prototype interface and functionality
     *      - addChangeListener (accepts a callback parameter)
     *      - removeChangeListener
     *      - emitChange
     */
    addChangeListener: function(callback) {

        // Call the callback whenever change occurs in this Store
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    // Expose skill data
    getAllSkills: function() {
        return _skills;
    },

    getSkillById: function (id) {
        return _.find(_skills, {id: id});
    }
});

/**
 *  Private function implementation detail not concerned with our Public Store API
 *  Register Store with Dispatcher. All Stores are notified each time any
 *  Action occurs and is dispatched from createSkill Action Creator.
 *  Note: Flux differs here from traditional Pub-Sub Design Patterns
 */
Dispatcher.register(function(action) {

    // Switch based on all possible Action Types that may be passed in with the Action Payload
    switch(action.actionType) {
        case ActionTypes.CREATE_SKILL:

            // Save to Flux Store State in private data the skill value sent from in the Action Payload
            _skills.push(action.skill);

            /**
             *  Call emitChange function in Public API to emit the change whenever the Flux Store changes
             *  to notify any React Components that registered with addChangeListener function of this Flux Store
             *  so they update the UI
             */
            SkillStore.emitChange();
    }
});

module.exports = SkillStore;

