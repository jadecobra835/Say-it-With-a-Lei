import React, { Component } from 'react';
 
export default class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            cart: this.props.cart
        }
    }

    componentDidMount() {
        console.log('Hi there')
    }

    

    render() {
        return (
            <div>
                <h1>Hi there</h1>
            </div>
        );
    }
}