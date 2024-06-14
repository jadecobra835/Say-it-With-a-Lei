import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import NavLinks from './dropdown';

import logo from '../../../static/assets/Main_Logo.jpg'
 
export default class Navigation extends Component {
    constructor(props) {
        super(props)

        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        localStorage.removeItem("dateLoggedIn")
        if (localStorage.getItem("dateLoggedIn") == null) {
            this.props.logOut()
        }
    }
    
    render() {    
        return (
            <div className="navWrapper">
                <div className="logoWrapper">
                    <NavLink exact to="/" className="navLink"><img src={logo} /></NavLink>
                </div>

                <div className="navBarLeftWrapper">
                    { this.props.loggedInStatus == true ?
                        <div className="sign-out-button">
                            <FontAwesomeIcon icon={faRightFromBracket} onClick={this.logOut} />
                        </div>
                    :
                        <div />    
                    }

                    <NavLinks />
                </div>
            </div>
        );
    }
}