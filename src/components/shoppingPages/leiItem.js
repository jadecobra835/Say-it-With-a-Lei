import React, { Component } from 'react';
import axios from 'axios';
 
export default class LeiItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            leiItem: {},
            qty: 1
        };

        this.getLeis = this.getLeis.bind(this);
        this.handleQtyChange = this.handleQtyChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit() {
        const formData = {
            "leiItem": this.state.leiItem,
            "qty": this.state.qty
        }
        
        this.props.addToCart(formData)

        this.props.history.push('/cart')
    }

    componentDidMount() {
        this.getLeis()
    }
    
    getLeis() {
        axios.get(
            `http://127.0.0.1:5000/get-one-lei/${this.props.match.params.slug}`,
            { withCredentials: true }
        ).then(response => {
            this.setState({
                leiItem: response.data[0]
            })
        }).catch(error => {
            console.log("getLeiItem error", error)
        })
    }

    handleQtyChange(event) { 
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    render() {
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
        } = this.state.leiItem

        return (
            <div className="leiItemWrapper">
                <div className="leftColumn">
                    <img src={image} alt="lei" />
                </div>

                <div className="rightColumn">
                    <div className="leiItemTop">
                        <div className="heading">
                            <h1>{name}</h1>
                        </div>

                        <div className="leiPrice">
                            {`$${price * this.state.qty}.00`}
                        </div>
                    </div>

                    <div className="leiItemBody">
                        {'   ' + description}
                    </div>

                    <div className="leiItemBottom">
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

                        <button className="addToCart" id="addToCart" onClick={this.handleSubmit}>Add To Cart</button>   
                    </div>
                </div>
            </div>
        );
    }
}