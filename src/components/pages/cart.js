import React, { Component } from 'react';
import CartItem from '../cart/cartItem'; 

export default class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            grandTotal: 0
        }

        this.renderCartItems = this.renderCartItems.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.changeQty = this.changeQty.bind(this)
        this.handleCheckout = this.handleCheckout.bind(this);
    }

    handleCheckout() {
        const total = this.props.totalPrice()
        console.log('Checkout', total)
    }

    changeQty(item, qty) {
        const index = this.props.cart.indexOf(item)
        this.props.handleCartQtyChange(index, qty)
    }

    removeFromCart(item) {
        const index = this.props.cart.indexOf(item)
        this.props.handleCartRemoveItem(index)
    }

    renderCartItems() {
        if (this.props.cart.length !== 0) {
            return this.props.cart.map(item => {
                return <CartItem 
                    item={item}
                    removeItem={this.removeFromCart}
                    changeQty={this.changeQty}
                    key={this.props.cart.indexOf(item)}
                    id={this.props.cart.indexOf(item)}
                />
            })
        } else {
            return <div>No Cart Items</div>
        }
    }

    render() {
        return (
            <div className="cartPageWrapper">
                <div className="heading">
                    <h1>Cart</h1>
                </div>

                <div className="cartItems">
                    { this.renderCartItems() }
                </div>

                <div className="totalPrice" id="totalPrice">
                    <h1>{`$${this.props.totalPrice()}.00 `}</h1>
                </div>

                <div className="checkoutBtn">
                    <button onClick={this.handleCheckout}>Checkout</button>
                </div>
            </div>
        );
    }
}