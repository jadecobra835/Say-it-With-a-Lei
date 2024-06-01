import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import '@stripe/stripe-js';

import Home from './Home/home.js';
import Navigation from './navigation/nav-bar';
import AboutMe from './aboutMe/aboutMe.js';
import Custom from './customLei/customLei.js';
import Graduation from './shoppingPages/graduation.js';
import Auth from './auth/auth.js';
import Payment from './payment/paymentFormContainer.js';
import LeiItem from './shoppingPages/leiItem.js';
import Cart from './pages/cart.js';

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      loggedInStatus: false,
      cartItems: [],
      grandTotal: 0
    }

    this.successfullLogin = this.successfullLogin.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.handleCartQtyChange = this.handleCartQtyChange.bind(this);
    this.handleCartRemoveItem = this.handleCartRemoveItem.bind(this);
    this.totalCartPrice = this.totalCartPrice.bind(this);
  }

  componentDidMount() {
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

    console.log(parseInt(currentPrice))
    return parseInt(currentPrice)
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
            
            <Route 
              path="/payment" 
              render={props => (
                <Payment
                  {...props}
                  totalPrice={this.totalCartPrice}
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

          </Switch>
        </Router>

      </div>
    );
  }
}
