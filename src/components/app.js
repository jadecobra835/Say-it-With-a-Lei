import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '@stripe/stripe-js';



import Home from './Home/home.js';
import Navigation from './navigation/nav-bar';
import AboutMe from './aboutMe/aboutMe.js';
import Custom from './customLei/customLei.js';
import Graduation from './shoppingPages/graduation.js';
import Auth from './auth/auth.js';
import Payment from './payment/payment.js';

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      loggedInStatus: false
    }

    this.successfullLogin = this.successfullLogin.bind(this);
  }

  successfullLogin(state) {
    this.setState({
      loggedInStatus: state
    })
  }

  render() {
    return (
      <div className='app'>
        <Router>
          <div className="navBar">
            <Navigation />
          </div>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about-me" component={AboutMe} />
            <Route path="/make-your-own" component={Custom} />
            <Route path="/graduation" component={Graduation} />
            <Route path="/payment" component={Payment} />

            <Route 
              path="/auth" 
              render={props => (
                <Auth 
                  {...props}
                  successfullLogin={this.successfullLogin}
                />
              )}
            />
          </Switch>
        </Router>

      </div>
    );
  }
}
