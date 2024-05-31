import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import onClickOutside from "react-onclickoutside";
 
class NavLinks extends Component {
    constructor() {
        super()

        this.state = {
            dropdown: false
        }

        this.handleOpen = this.handleOpen.bind(this);
    }

    
    handleOpen() {
        if (this.state.dropdown) {
            this.setState({
                dropdown: false
            })
        } else {
            this.setState({
                dropdown: true
            })
        }
    }

    handleClickOutside = evt => {
        this.setState({
            dropdown: false
        })
    }
    
    render() {
        return (
            <div className="dropdownWrapper">
                <div className="navBarIcon">
                    <FontAwesomeIcon icon={faBars} onClick={this.handleOpen} />
                </div>
                    
                { this.state.dropdown == true ?
                    <div className="linksWrapper">
                        <div className="linkWrapper lightTeal">
                            <NavLink exact to="/" className="navLink">Home</NavLink>
                        </div>

                        <div className="linkWrapper darkTeal">
                            <NavLink to="/about-me" className="navLink">About Me</NavLink>
                        </div>

                        <div className="linkWrapper lightTeal">
                            <NavLink to="/make-your-own" className="navLink">Design Your Own</NavLink>
                        </div>

                        <div className="linkWrapper darkTeal">
                            <NavLink to="/graduation" className="navLink">Graduation</NavLink>
                        </div>

                        <div className="linkWrapper lightTeal">
                            <NavLink to="/cart" className="navLink">Cart</NavLink>  
                            
                        </div>

                        <div className="linkWrapper darkTeal">
                            <NavLink to="/payment" className="navLink">Payment</NavLink> 
                        </div>

                        <div className="linkWrapper lightTeal">
                            <NavLink to="/auth" className="navLink">Auth</NavLink>
                        </div>
                    </div>
                    :
                    <div />
                }   
        </div>
        );
    }
}

export default onClickOutside(NavLinks)