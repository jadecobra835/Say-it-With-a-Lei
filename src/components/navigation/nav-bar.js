import React, { Component } from 'react';

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
                    <img src={logo} />
                </div>

                <NavLinks />

            </div>
        );
    }
}