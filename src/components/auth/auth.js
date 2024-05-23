import React, { Component } from 'react';
import axios from 'axios';
 
export default class Auth extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userName: "",
            password: ""
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
            url: "http://127.0.0.1:5000/auth",
            headers: {"content-type": "multipart/form-data"},          
            data: this.buildForm(),
            withCredentials: true
        }).then(response => {
            const result = response
            console.log(result);

            return result
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
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        onChange={this.handleChange} 
                        name="userName"
                        placeholder='Username' 
                        maxLength={45} 
                        value={this.state.userName}
                    />

                    <input 
                        type='password' 
                        onChange={this.handleChange} 
                        name="password" 
                        maxLength={45} 
                        value={this.state.password}
                    />
                    <button type='submit'className="loginButton">Log In</button>                
                </form>
            </div>
        );
    }
}