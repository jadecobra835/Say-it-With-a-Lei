import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '@stripe/stripe-js';

import Home from './pages/home.js';
import Navigation from './navigation/nav-bar';
import AboutMe from './pages/aboutMe.js';
import Custom from './pages/customLei.js';
import Graduation from './pages/graduation.js';
import WeddingAndBaptism from './pages/weddingAndBaptism.js';
import Auth from './pages/auth.js';
import Payment from './pages/paymentFormContainer.js';
import LeiItem from './shoppingPages/leiItem.js';
import Cart from './pages/cart.js';

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      loggedInStatus: false,
      cartItems: [],
    }

    this.successfullLogin = this.successfullLogin.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.handleCartQtyChange = this.handleCartQtyChange.bind(this);
    this.handleCartRemoveItem = this.handleCartRemoveItem.bind(this);
    this.totalCartPrice = this.totalCartPrice.bind(this);
    this.logOut = this.logOut.bind(this);
    this.clearCart = this.clearCart.bind(this);
  }

  componentDidMount() {
    const lastLoggedIn = localStorage.getItem("dateLoggedIn")
    const d = new Date()
    const todaysDate = d.toDateString();

    if (lastLoggedIn == todaysDate) {
      this.setState({
        loggedInStatus: true
      })
    } else {
      this.setState({
        loggedInStatus: false
      })
    }

    const cartData = localStorage.getItem("cart")
    if (cartData !== null) {
      const cart = JSON.parse(cartData)
      this.setState({
        cartItems: cart
      })
    } 
  }

  totalCartPrice() {
    const currentCart = this.state.cartItems;
    let currentPrice = 0

    currentCart.map(item => {
      if (item["type"] == "custom") {
        currentPrice = (currentPrice + (item.qty * item.price))
      } else {
        const correctItem = item.leiItem
        currentPrice = (currentPrice + (correctItem.price * item.qty))
      }
    })

    if (currentPrice !== 0) {
      return parseInt(currentPrice);
    } 
  }

  handleCartRemoveItem(index) {
    const currentCart = this.state.cartItems
    currentCart.splice(index, 1)

    this.setState({
      cartItems: currentCart
    })

    if (localStorage.getItem("cart") !== null) {
        localStorage.removeItem("cart")
    }
      
    localStorage.setItem("cart", JSON.stringify(this.state.cartItems))
  }

  handleCartQtyChange(index, qty) {
    let newCartItems = this.state.cartItems
    const newQty = parseInt(qty)
    newCartItems[index].qty = newQty

    this.setState({
      cartItems: newCartItems
    })

    if (localStorage.getItem("cart") !== null) {
      localStorage.removeItem("cart")
    }

    localStorage.setItem("cart", JSON.stringify(this.state.cartItems))
  }

  addToCart(cartItem) {
    this.state.cartItems.push(cartItem)

    if (localStorage.getItem("cart") !== null) {
      localStorage.removeItem("cart")
    }

    localStorage.setItem("cart", JSON.stringify(this.state.cartItems))
  }

  clearCart() {
    console.log('clearingCart')
    this.setState({
      cartItems: []
    })

    if (localStorage.getItem("cart") !== null) {
      localStorage.removeItem("cart")
    }
  }

  successfullLogin(state, date) {
    this.setState({
      loggedInStatus: state
    })

    localStorage.removeItem("dateLoggedIn")
    localStorage.setItem("dateLoggedIn", date)
  }

  logOut() {
    this.setState({
      loggedInStatus: false
    })
  }

  render() {
    return (
      <div className='app'>
        <Router>
          <div className="navBar">
            <Navigation loggedInStatus={this.state.loggedInStatus} logOut={() => this.logOut()} />
          </div>

          <Switch>
            <Route 
              exact path={["/", "/success"]} 
              render={
                props => (
                  <Home 
                    {...props}
                    clearCart = {this.clearCart}
                  />
              )} 
            />

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
            
            <Route 
              exact path="/graduation" 
              render={props => (
                <Graduation 
                  {...props}
                  loggedInStatus={this.state.loggedInStatus} 
                />
              )} 
            />

            <Route 
              exact path="/wedding-and-baptism" 
              render={props => (
                <WeddingAndBaptism 
                  {...props}
                  loggedInStatus={this.state.loggedInStatus} 
                />
              )} 
            />  
            
            <Route 
              path="/payment" 
              render={props => (
                <Payment
                  {...props}
                  totalPrice={this.totalCartPrice}
                  cartItems={this.state.cartItems}
                />
              )} 
            />

            <Route 
              path="/cart" 
              render={props => (
                <Cart 
                  {...props}
                  cart={this.state.cartItems}
                  handleCartQtyChange={this.handleCartQtyChange}
                  handleCartRemoveItem={this.handleCartRemoveItem}
                  totalPrice={this.totalCartPrice}
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

            <Route 
              exact path="/wedding-and-baptism/:slug" 
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
