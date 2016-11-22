"use strict";

// React "Key Mirror" library (automatically copies key to the value)
var keyMirror = require('react/lib/keyMirror');

module.exports = keyMirror({

    // Define list of Action Types in app
    INITIALISE: null,
    CREATE_SKILL: null,
    UPDATE_SKILL: null,
    DELETE_SKILL: null
});