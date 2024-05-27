import React, { Component } from 'react';
 
export default class LeiItem extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        const { id, name, price, image, description, color1, color2, color3, color4, type } = this.props.item;
        return (
            <div id={id} className={`leiItem ${name} ${color1} ${color2} ${color3} ${color4} ${type}`}>
                <div className="leiItemImageWrapper">
                    <img src={image} alt="lei" />
                </div>

                <div className="nameOfLei">
                    {name}
                </div>

                <div className="leiPrice">
                    {`$${price}.00`}
                </div>
            </div>
        );
    }
}