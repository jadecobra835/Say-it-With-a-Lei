import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// import { withRouter } from 'react-router';

import logo from '../../../static/assets/Main_Logo.jpg'
 
export default class Navigation extends Component {
    render() {    
        return (
            <div className="navWrapper">
                <div className="logoWrapper">
                    <img src={logo} />
                </div>

                <div className="linksWrapper">
                    <div className="linkWrapper lightTeal">
                        <NavLink exact to="/">Home</NavLink>
                    </div>

                    <div className="linkWrapper darkTeal">
                        <NavLink to="/about-me">About Me</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}