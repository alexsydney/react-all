"use strict";

var React = require('react');
var Input = require('../common/textInput');

var SkillForm = React.createClass({
    render: function () {
        return (
            <form>
                <h1>Manage Skill</h1>
                <Input
                    name="skillCategory"
                    label="Skill Category"
                    value={this.props.skill.skillCategory}
                    onChange={this.props.onChange}
                    error={this.props.errors.skillCategory} />
                {/* Input 'skillName' bound to skillName Prop passed from Parent Component */}
                {/* Use onChange handler that is passed down from Parent Component
                 to attach to input. Upon change the event bubbles up to Parent Component,
                 which calls setSkillState event handler to update State */}
                <Input
                    name="skillName"
                    label="Skill Name"
                    value={this.props.skill.skillName}
                    onChange={this.props.onChange}
                    error={this.props.errors.skillName} />
                {/* onClick handler is passed down from Parent Component skillManager
                 to attach to input submit button. Upon change the event bubbles up to Parent Component
                 which calls saveSkill event handler to save the field data to the Mock API */}
                <input type="submit"
                       value="Save"
                       className="btn btn-default"
                       onClick={this.props.onSave} />
            </form>
        );
    }
});

module.exports = SkillForm;