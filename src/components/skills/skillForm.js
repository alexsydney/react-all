"use strict";

var React = require('react');

var SkillForm = React.createClass({
    render: function () {
        return (
            <form>
                <h1>Manage Skill</h1>
                <label htmlFor="skillName">Skill Name</label>
                {/* Input 'skillName' bound to skillName Prop passed from Parent Component */}
                {/* Use onChange handler that is passed down from Parent Component
                    to attach to input. Upon change the event bubbles up to Parent Component,
                    which calls setSkillState event handler to update State */}
                <input type="text"
                       name="skillName"
                       className="form-control"
                       placeholder="Skill Name"
                       ref="skillName"
                       onChange={this.props.onChange}
                       value={this.props.skill.skillName} />
                <br />
                <input type="submit"
                       value="Save"
                       className="btn btn-default" />
            </form>
        );
    }
});

module.exports = SkillForm;