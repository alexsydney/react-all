"use strict";

// mock web API by hitting hard coded data
var skills = require('../data/skillData').skills;
var _ = require('lodash');

// stub in action normally performed on the server in real app
var _generateId = function(skill) {
    return skill.skillName.toLowerCase();
};

// return cloned copy so item passed by value instead of by reference
var _clone = function(item) {
    return JSON.parse(JSON.stringify(item));
};

var SkillApi = {
    getAllSkills: function() {
        return _clone(skills);
    },

    getSkillById: function(id) {
        var skill = _.find(skills, {id: id});
        return _clone(skill);
    },

    saveSkill: function(skill) {
        // pretend ajax call to web api made here
        console.log('Pretend just saved skill to DB via AJAX call');

        if (skill.id) {
            var existingSkillIndex = _.indexOf(skills, _.find(skills, {id: skill.id}));
            skills.splice(existingSkillIndex, 1, skill);
        } else {
            // simulate creation. server would generate ids for new skills in real app.
            // cloning so copy returned is passed by value rather than by reference.
            skill.id = _generateId(skill);
            skills.push(skill);
        }
        return _clone(skill);
    },

    deleteSkill: function(id) {
        console.log('Pretend just deleted skill from DB via AJAX call');
        _.remove(skills, { id: id});
    }
};

module.exports = SkillApi;