"use strict";

var React = require('react');

var SkillForm = React.createClass({
    render: function () {
        return (
            <form>
                <h1>Manage Skill</h1>
                <label htmlFor="skillName">Skill Name</label>
                <input type="text"
                       name="skillName"
                       className="form-control"
                       placeholder="Skill Name"
                       ref="skillName"
                       value="" />
                <br />
                <input type="submit"
                       value="Save"
                       className="btn btn-default" />
            </form>
        );
    }
});

module.exports = SkillForm;