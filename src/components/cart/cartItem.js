import React, { Component } from 'react';

import customLei from '../../../static/assets/BlueGreenLeiSquare.jpg'
 
export default class CartItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            qty: 1,
            price: 15
        }

        this.handleQtyChange = this.handleQtyChange.bind(this);
    }

    componentDidMount() {
        if (this.props.item["type"] == "custom") {
            this.setState({
                price: this.props.item["price"],
                qty: this.props.item["qty"]
            })
        } else {
            const leiItem = this.props.item["leiItem"]
            
            this.setState({
                price: leiItem["price"],
                qty: this.props.item["qty"]
            })
        }
    }

    handleQtyChange(event) { 
        this.setState({
            qty: event.target.value,
        });

        this.props.changeQty(this.props.item, event.target.value)
    };
    
    render() {
        if (this.props.item["type"] == "custom") {
            const {
                type,
                name,
                size,
                color1,
                color2,
                color3,
                color4,
                price,
                qty
            } = this.props.item

            const newSize = size[0].toUpperCase() + size.slice(1);

            let mediaQuery = window.matchMedia("(max-width: 700px)")

            return (
                <div className="cartItemWrapper" id={this.props.id}>
                    <div className="cartItemImageWrapper" >
                        <img src={customLei} alt="customLei" />
                    </div>

                    <div className="cartItemOtherContent">
                        <div className="cartItemName">
                            {`${name} ${newSize} Weave`}
                        </div>

                        <div className="center-content">
                            {mediaQuery.matches ? 
                                <div>
                                    {`$${price * this.state.qty}.00`}
                                </div>
                            :
                                <div />
                            }

                            <div className="cartItemDescription">
                                { color3.id == "none"  ?
                                    <div className="colorList">
                                        <div>{`Color 1: ${color1.colorName}`}</div>
                                        <div>{`Color 2: ${color2.colorName}`}</div>
                                    </div>
                                :
                                    <div className="colorList">
                                        <div>{`Color 1: ${color1.colorName}`}</div>
                                        <div>{`Color 2: ${color2.colorName}`}</div>
                                        <div>{`Color 3: ${color3.colorName}`}</div>
                                        <div>{`Color 4: ${color4.colorName}`}</div>
                                    </div>
                                }
                            </div>
                        </div>

                        <div className="bottom-content">
                            <div className="qty-selector">
                                <select
                                    className="qty"
                                    name="qty"
                                    value={this.state.qty}
                                    onChange={this.handleQtyChange}
                                >
                                    <option value={1}>Qty: 1</option>
                                    <option value={2}>Qty: 2</option>
                                    <option value={3}>Qty: 3</option>
                                    <option value={4}>Qty: 4</option>
                                    <option value={5}>Qty: 5</option>
                                    <option value={6}>Qty: 6</option>
                                    <option value={7}>Qty: 7</option>
                                    <option value={8}>Qty: 8</option>
                                    <option value={9}>Qty: 9</option>
                                </select>
                            </div>

                            <div className="removeCartItem" onClick={() => {this.props.removeItem(this.props.item)}}>
                                Remove From Cart
                            </div>
                        </div>
                    </div>

                    <div className="price">
                            {mediaQuery.matches ? 
                                <div />
                            :
                                <div>
                                    {`$${price * this.state.qty}.00`}
                                </div>
                            }
                    </div>
                </div>
            );
        } else {
            const {
                leiItem,
                qty
            } = this.props.item

            const {
                id,
                name,
                price,
                image,
                color1,
                color2,
                color3,
                color4,
                description,
                type
            } = leiItem

            let mediaQuery = window.matchMedia("(max-width: 700px)")

            return (
                <div className="cartItemWrapper" id={this.props.id}>
                    <div className="cartItemImageWrapper">
                        <img src={image} alt="lei" />
                    </div>

                    <div className="cartItemOtherContent">
                        <div className="cartItemName">
                            {name}
                        </div>

                        <div className="center-content">
                            {mediaQuery.matches ? 
                                <div>
                                    {`$${price * this.state.qty}.00`}
                                </div>
                            :
                                <div />
                            }

                            <div className="cartItemDescription">
                                {description}
                            </div>
                        </div>

                        <div className="bottom-content">
                            <div className="qty-selector">
                                <select
                                    className="qty"
                                    name="qty"
                                    value={this.state.qty}
                                    onChange={this.handleQtyChange}
                                >
                                    <option value={1}>Qty: 1</option>
                                    <option value={2}>Qty: 2</option>
                                    <option value={3}>Qty: 3</option>
                                    <option value={4}>Qty: 4</option>
                                    <option value={5}>Qty: 5</option>
                                    <option value={6}>Qty: 6</option>
                                    <option value={7}>Qty: 7</option>
                                    <option value={8}>Qty: 8</option>
                                    <option value={9}>Qty: 9</option>
                                </select>
                            </div>

                            <div className="removeCartItem" onClick={() => {this.props.removeItem(this.props.item)}}>
                                Remove From Cart
                            </div>
                        </div>
                    </div>

                    <div className="price">
                            {mediaQuery.matches ? 
                                <div />
                            :
                                <div>
                                    {`$${price * this.state.qty}.00`}
                                </div>
                            }
                    </div>
                </div>
            );
        }

    }
}