import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import NavLinks from './dropdown';

import logo from '../../../static/assets/Main_Logo.jpg'
 
export default class Navigation extends Component {
    constructor() {
        super()
    }
    
    render() {    
        return (
            <div className="navWrapper">

                <div className="logoWrapper">
                    <NavLink exact to="/" className="navLink"><img src={logo} /></NavLink>
                </div>

                <NavLinks />

            </div>
        );
    }
}