"use strict";

var _ = require('lodash');

module.exports = {
    replaceValueAtIndexForExistingId: function (skills, skill) {
        var existingSkill = _.find(skills, {id: skill.id});
        var existingSkillIndex = _.indexOf(skills, existingSkill);

        // Replace existing index with skill received in Action Payload
        skills.splice(existingSkillIndex, 1, skill);
    }
};