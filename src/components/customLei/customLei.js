import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

import ColorItem from './colorItem';

export default class Custom extends Component {
    constructor() {
        super()

        this.state = {
            size: "single",
            color1: "",
            color2: "",
            color3: "",
            color4: "",
            qty: 1,
            price: "00.00",
            colors: [
                {id: 0, colorName: "red", colorHex: "red"},
                {id: 1, colorName: "orange", colorHex: "orange"},
                {id: 2, colorName: "yellow", colorHex: "yellow"},
                {id: 3, colorName: "green", colorHex: "green"},
                {id: 4, colorName: "blue", colorHex: "blue"},
                {id: 5, colorName: "purple", colorHex: "purple"},
            ]
        }

        this.colorChoices = this.colorChoices.bind(this);
    }

    colorChoices() {
        return this.state.colors.map(item => {
            return (
                <ColorItem
                    key={item.id}
                    item={item}
                />
            );
        });
    };

    render() {
        return (
            <div className="customLeiPage">
                <div className="heading">
                    <h1>Make Your Own</h1>
                </div>

                <div className="subHeading">
                    Choose Your Size
                </div>

                <div className="sizeOptionsWrapper">
                    <div className="sizeOption">
                        <div className="sizeText" style={{color: 'black'}}>
                            Single Weave (Two Strands)
                        </div>

                        <div className="selectorIcon active">
                            <FontAwesomeIcon icon={faCircleCheck} />
                        </div>
                    </div>
                    

                    <div className="sizeOption">
                        <div className="sizeText" style={{color: 'black'}}>
                            Double Weave (Four Strands)
                        </div>

                        <div className="selectorIcon inactive">
                            <FontAwesomeIcon icon={faCircle} />
                        </div>
                    </div>
                </div>

                <div className="subHeading">
                    Pick Your Colors
                </div>

                <div className="colorPickerWrapper">
                    <div className="colorOne">
                        <div className="colorOneText">
                            Color One:
                        </div>

                        <div className="colorOneColor">
                            Placeholder
                        </div>

                        <div className="colorChoicesWrapper">
                            {this.colorChoices()}
                        </div>
                    </div>

                    <div className="colorTwo">
                        <div className="colorTwoText">
                            Color Two:
                        </div>

                        <div className="colorTwoColor">
                            Placeholder
                        </div>
                    </div>

                    <div className="colorThree">
                        <div className="colorThreeText">
                            Color Three:
                        </div>

                        <div className="colorThreeColor">
                            Placeholder
                        </div>
                    </div>

                    <div className="colorFour">
                        <div className="colorFourText">
                            Color Four:
                        </div>

                        <div className="colorFourColor">
                            Placeholder
                        </div>
                    </div>

                    <div className="qty selector">
                        <select
                            name="qty"
                        >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                        </select>
                    </div>

                    <div className="price">
                        {`$${this.state.price}`}
                    </div>

                    <button className="addToCart">Add To Cart</button>
                </div>
            </div>
        );
    }
}