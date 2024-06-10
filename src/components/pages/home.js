import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import headshot from '../../../static/assets/HomeHeadshot.jpg';
import weddingAndBaptism from '../../../static/assets/BlueGreenLei.jpg';
import graduation from '../../../static/assets/OrangeLei.jpg';
import custom from '../../../static/assets/BlueGreenLei.jpg';
 
export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <div className="pictureLinksWrapper">
                    <div className="pictureLink">
                        <NavLink to="about-me">
                            <div className="imageLink" style={{backgroundImage: `url(${weddingAndBaptism})`}}>
                                <div className="imageButton">
                                    <p>Wedding & Baptism</p>
                                </div>
                            </div>
                        </NavLink>
                        
                    </div>

                    <div className="pictureLink">
                        <NavLink to="graduation">
                            <div className="imageLink" style={{backgroundImage: `url(${graduation})`}}>
                                <div className="imageButton">
                                    <p>Graduation</p>
                                </div>
                            </div>
                        </NavLink>
                    </div>

                    <div className="pictureLink">
                        <NavLink to="make-your-own">
                            <div className="imageLink" style={{backgroundImage: `url(${custom})`}}>
                                <div className="imageButton">
                                    <p>Design Your Own</p>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </div>

                <div className="aboutMeWrapper">
                    <div className="aboutMeContentWrapper">
                        <div className="heading">
                            <h1>About Me</h1>
                        </div>

                        <div className="text aboutMeText">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                            sunt in culpa qui officia deserunt mollit anim id est laborum. <NavLink to="about-me">Learn More...</NavLink>
                        </div>
                    </div>

                    <div className="homepageImageWrapper">
                        <img src={headshot} />
                    </div>
                </div>

                <div className="locationWrapper">
                    <div className="embedWrapper homepageImageWrapper">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48785.76090162136!2d-111.6512880666664!3d40.16210326382978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x874d962ee1ee8d05%3A0x5678ae5a009f7c7f!2sSpringville%2C%20UT!5e0!3m2!1sen!2sus!4v1717902774553!5m2!1sen!2sus" width="600" height="450" style={{border: 0}}allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>

                    <div className="locationTextWrapper">
                        <div className="heading">
                            <h1>My Location</h1>
                        </div>

                        <div className="text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                            sunt in culpa qui officia deserunt mollit anim id est laborum. 
                        </div>
                    </div>
                </div>

                <div className="paymentOptionsWrapper">
                        <div className="heading">
                            <h1>We Take</h1>
                        </div>

                        <div className="paymentOptions">

                        </div>
                    </div>

            </div>
        );
    }
}