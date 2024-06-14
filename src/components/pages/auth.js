import React, { Component } from 'react';
import axios from 'axios';

import Popup from '../auth/logInPopup';
 
export default class Auth extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userName: "",
            password: "",
            logInStatus: false,
            popupSize: '0px',
            popupTextSize: '0px'
        }

        this.handleSubmit = this.handleSubmit.bind(this); 
        this.handleChange = this.handleChange.bind(this);
        this.buildForm = this.buildForm.bind(this);
    }

    buildForm() {
        let auth = new FormData()
        
        auth.append("auth[userName]", this.state.userName);
        auth.append("auth[password]", this.state.password);

        return auth;
    }

    handleSubmit(event) {
        axios({
            method: "POST",
            // url: "http://127.0.0.1:5000/auth",
            url: "https://xjj-say-it-with-a-lei-python-ee64a24a30bb.herokuapp.com/auth",
            headers: {"content-type": "applicaiton.json"},          
            data: this.buildForm(),
            withCredentials: true
        }).then(response => {
            const result = response.data

            if (result == "Success") {
                const d = new Date()
                const date = d.toDateString()

                this.setState({
                    logInStatus: true,
                    popupSize: 200,
                    popupColor: "#5cb85c",
                    popupTextSize: "20px"
                })

                this.props.successfullLogin(this.state.logInStatus, date)
                this.props.history.push("/", {logInStatus: true} )
            } else if (result == "Wrong username or password") {
                this.setState({
                    popupSize: 200,
                    popupColor: "#ff3333",
                    popupTextSize: "20px"
                })
            }
        }).catch(error => {
            console.log("handleSubmit Error", error)
        });

        event.preventDefault()
    };

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        return (
            <div className="authPage">
                <form onSubmit={this.handleSubmit} className="authForm">
                    <input 
                        type="text" 
                        onChange={this.handleChange} 
                        name="userName"
                        className="userName"
                        placeholder='Username' 
                        maxLength={45} 
                        value={this.state.userName}
                    />

                    <input 
                        type='password' 
                        onChange={this.handleChange} 
                        name="password" 
                        className="password"
                        placeholder='Password'
                        maxLength={45} 
                        value={this.state.password}
                    />
                    <button type='submit'className="loginButton">Log In</button>
                </form>

                <Popup 
                    messageType={this.state.logInStatus} 
                    height={this.state.popupSize} 
                    color={this.state.popupColor} 
                    textSize={this.state.popupTextSize}
                />
            </div>
        );
    }
}