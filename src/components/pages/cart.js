import React, { Component } from 'react';
import CartItem from '../cart/cartItem'; 

export default class Cart extends Component {
    constructor(props) {
        super(props)

        this.renderCartItems = this.renderCartItems.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        this.changeQty = this.changeQty.bind(this)
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
            console.log("cart", this.props.cart)

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
            </div>
        );
    }
}