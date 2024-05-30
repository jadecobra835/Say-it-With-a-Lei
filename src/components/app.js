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
import LeiItem from './shoppingPages/leiItem.js';
import Cart from './pages/cart.js';

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      loggedInStatus: false,
      cartItems: []
    }

    this.successfullLogin = this.successfullLogin.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    const cartData = localStorage.getItem("cart")

    if (cartData !== null) {
      const cart = JSON.parse(cartData)

      cart.map(item => {
        this.state.cartItems.push(item)
      })
    } 
  }

  successfullLogin(state) {
    this.setState({
      loggedInStatus: state
    })
  }

  addToCart(cartItem) {
    this.state.cartItems.push(cartItem)

    if (localStorage.getItem("cart") !== null) {
      localStorage.removeItem("cart")
    }

    localStorage.setItem("cart", JSON.stringify(this.state.cartItems))
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

            <Route 
              path="/make-your-own" 
              render={props => (
                <Custom 
                  {...props}
                  addToCart={this.addToCart}
                />
              )}
            />
            
            <Route exact path="/graduation" component={Graduation} />
            
            <Route path="/payment" component={Payment} />
            <Route 
              path="/cart" 
              render={props => (
                <Cart 
                  {...props}
                  cart={this.state.cartItems}
                />
              )}
            />
            

            <Route 
              path="/auth" 
              render={props => (
                <Auth 
                  {...props}
                  successfullLogin={this.successfullLogin}
                />
              )}
            />

            <Route 
              exact path="/graduation/:slug" 
              render={props => (
                <LeiItem 
                  {...props}
                  addToCart={this.addToCart}
                />
              )}
            />

          </Switch>
        </Router>

      </div>
    );
  }
}
