"use strict";

var React = require('react');

// Abstract by redirecting to named routes using Link Component from React Router
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({
    render: function () {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed"
                                              data-toggle="collapse"
                                              data-target="#navbar2">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link to="app" className="navbar-brand">
                            <img src="http://placehold.it/200x50" alt="Welcome"/>
                        </Link>
                    </div>
                    <div id="navbar2" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="app" className="active">Home</Link></li>
                            <li><Link to="skills">Skills</Link></li>
                            <li><Link to="about">About</Link></li>
                            <li className="dropdown">
                                <Link to="app" className="dropdown-toggle"
                                            data-toggle="dropdown"
                                            role="button"
                                            aria-expanded="false">
                                    Dropdown <span className="caret"></span>
                                </Link>
                                <ul className="dropdown-menu" role="menu">
                                    <li><Link to="app">Action</Link></li>
                                    <li className="divider"></li>
                                    <li className="dropdown-header">Nav Header</li>
                                    <li><Link to="app">Separated Link</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});

module.exports = Header;