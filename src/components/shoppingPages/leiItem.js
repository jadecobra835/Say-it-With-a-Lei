import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
 
export default class LeiItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            leiItem: {},
            qty: 1,
            loading: false
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
        this.setState({
            loading: true
        })

        axios.get(
            `https://xjj-say-it-with-a-lei-python-ee64a24a30bb.herokuapp.com/get-one-lei/${this.props.match.params.slug}`,
            { withCredentials: true }
        ).then(response => {
            this.setState({
                leiItem: response.data[0],
                loading: false
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
            <div>
                {this.state.loading ? (
                    <div className="loadingIcon">
                        <FontAwesomeIcon icon={faSpinner} spin={true} style={{marginTop: '40px'}}/>
                    </div>
                ) :
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
                }
            </div>
        );
    }
}