import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';

import Home from './home';
import Navigation from './navigation/nav-bar';
import aboutMe from './aboutMe';

export default class App extends Component {
  constructor() {
    super()
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
            <Route path="/about-me" component={aboutMe} />
          </Switch>
        </Router>

      </div>
    );
  }
}
