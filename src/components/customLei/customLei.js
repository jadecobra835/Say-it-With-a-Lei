import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { faCircleCheck , faCircle as solidCircle } from '@fortawesome/free-solid-svg-icons'


import ColorItem from './colorItem';

export default class Custom extends Component {
    constructor(props) {
        super(props)

        this.state = {
            size: "",
            color1: {id: "none",colorName: "Choose", colorHex: "transparent"},
            color2: {id: "none",colorName: "Choose", colorHex: "transparent"},
            color3: {id: "none", colorName: "Choose", colorHex: "transparent"},
            color4: {id: "none", colorName: "Choose", colorHex: "transparent"},
            qty: 1,
            weavePrice: 0,
            activeColorNumber: "",
            colors: [
                {id: 0, colorName: "Red", colorHex: "red"},
                {id: 1, colorName: "Orange", colorHex: "orange"},
                {id: 2, colorName: "Yellow", colorHex: "yellow"},
                {id: 3, colorName: "Green", colorHex: "green"},
                {id: 4, colorName: "Blue", colorHex: "blue"},
                {id: 5, colorName: "Purple", colorHex: "purple"},
                {id: 6, colorName: "Black", colorHex: "black"},
                {id: 7, colorName: "White", colorHex: "white"},
            ]
        }

        this.colorChoices = this.colorChoices.bind(this);
        this.handleQtyChange = this.handleQtyChange.bind(this);
        this.handleWeaveChoice = this.handleWeaveChoice.bind(this);
        this.handleColorNumber = this.handleColorNumber.bind(this);
        this.handleColorChoice = this.handleColorChoice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBuildForm = this.handleSubmit.bind(this);
    };


    componentDidMount() {
        const button = document.getElementById("addToCart")
        button.setAttribute('disabled', '')
    }


    componentDidUpdate() {
        const button = document.getElementById("addToCart")
        button.setAttribute('disabled', '')
        button.classList.add('disabled')
        
        if (
            this.state.size == "single" &&
            this.state.color1.id !== "none" &&
            this.state.color2.id !== "none"
        ) {
            button.removeAttribute('disabled');
            button.classList.remove('disabled');
        } else if (
            this.state.size == "double" &&
            this.state.color1.id !== "none" &&
            this.state.color2.id !== "none" &&
            this.state.color3.id !== "none" &&
            this.state.color4.id !== "none" 
        ) {
            button.removeAttribute('disabled');
            button.classList.remove('disabled');
        }
    }


    buildForm() {
        const formData = {
            "type": "custom",
            "name": "Custom",
            "size": this.state.size,
            "color1": this.state.color1,
            "color2": this.state.color2,
            "color3": this.state.color3,
            "color4": this.state.color4,
            "qty": this.state.qty,
            "price": this.state.weavePrice
        }

        return formData;
    }


    handleSubmit() {
        const form = this.buildForm()

        this.setState({
                size: "",
                color1: {id: "none",colorName: "Choose", colorHex: "transparent"},
                color2: {id: "none",colorName: "Choose", colorHex: "transparent"},
                color3: {id: "none", colorName: "Choose", colorHex: "transparent"},
                color4: {id: "none", colorName: "Choose", colorHex: "transparent"},
                qty: 1,
                weavePrice: 0,
                activeColorNumber: "",
        })

        this.props.addToCart(form)

        this.props.history.push('/cart')
    }


    handleQtyChange(event) { 
        this.setState({
            [event.target.name]: event.target.value,
        });
    };


    handleWeaveChoice(event) {
        const size = event.target.parentElement.attributes.name.value
    
        this.setState({
            size: size        
        });

        if (size == "single") {
            document.getElementById("color1").classList.replace("inactiveColorOptions", "activeColorOptions")

            this.setState({
                activeColorNumber: "color1",
                weavePrice: 15,
                color3: {id: "none", colorName: "Choose", colorHex: "transparent"},
                color4: {id: "none", colorName: "Choose", colorHex: "transparent"}
            })
        } else if (size == "double") {
            document.getElementById("color1").classList.replace("inactiveColorOptions", "activeColorOptions")

            this.setState({
                activeColorNumber: "color1",
                weavePrice: 20
            })
        }
    };


    handleColorChoice(id) {
        this.setState({
            [this.state.activeColorNumber]: this.state.colors[id]
        })

        if (this.state.activeColorNumber == "color1") {
            this.setState({
                activeColorNumber: "color2"
            })

        } else if (this.state.activeColorNumber == "color2") {
            this.setState({
                activeColorNumber: "color3"
            })
        } else if (this.state.activeColorNumber == "color3") {
            this.setState({
                activeColorNumber: "color4"
            })
        } else if (this.state.activeColorNumber == "color4") {
            this.setState({
                activeColorNumber: ""
            })
        }
    }


    handleColorNumber(event) {
        const currentActive = document.getElementsByClassName("activeColorOptions");
        const id = event.target.parentElement.attributes.name.value;
        const newActive = document.getElementById(id);
        
        if ((currentActive[0] !== undefined) && (currentActive[0].id !== newActive.id))  {
            currentActive[0].classList.replace("activeColorOptions", "inactiveColorOptions")
            newActive.classList.replace("inactiveColorOptions", "activeColorOptions")

            this.setState({
                activeColorNumber: id
            })
        } else if (currentActive[0] !== undefined) {
            currentActive[0].classList.replace("activeColorOptions", "inactiveColorOptions")

            this.setState({
                activeColorNumber: ""
            })
        } else {
            newActive.classList.replace("inactiveColorOptions", "activeColorOptions")

            this.setState({
                activeColorNumber: id
            })

            console.log('else')
        }
    }


    colorChoices() {
        return this.state.colors.map(item => {
            return (
                <ColorItem
                    key={item.id}
                    item={item}
                    clickFunction={this.handleColorChoice}
                />
            );
        });
    };


    render() {
        return (
            <div className="customLeiPage">
                <div className="heading">
                    <h1>Design Your Own</h1>
                </div>

                <div className="subHeading">
                    Choose Your Size
                </div>

                <div className="sizeOptionsWrapper">
                    <div 
                        className="sizeOption"
                        onClick={this.handleWeaveChoice}
                        name="single"
                    >
                        <div 
                            className="sizeText" 
                            style={{color: 'black'}}
                        >
                            Single Weave (Two Strands)
                        </div>

                        <div className="circleIcon" name="single">
                            { this.state.size == "single" ?
                                <FontAwesomeIcon icon={faCircleCheck} />
                            :
                                <FontAwesomeIcon icon={faCircle} />
                            }
                        </div>
                    </div>
                    

                    <div 
                        className="sizeOption"
                        onClick={this.handleWeaveChoice}
                        name="double"
                    >
                        <div 
                            className="sizeText" 
                            style={{color: 'black'}}
                        >
                            Double Weave (Four Strands)
                        </div>

                        <div 
                            className="circleIcon" 
                            name="double"   
                        >
                            { this.state.size == "double" ?
                                <FontAwesomeIcon icon={faCircleCheck} />
                            :
                                <FontAwesomeIcon icon={faCircle} />
                            }
                        </div>
                    </div>
                </div>

                <div className="subHeading">
                    Pick Your Colors
                </div>

                <div className="colorPickerWrapper">
                    <div 
                        className="colorElementsWrapper inactiveColorOptions"
                        id="color1"
                    >
                        <div 
                            className="staticColorElementsWrapper"
                            name="color1"
                            onClick={this.handleColorNumber}
                        >
                            <div className="colorText">
                                Color One:
                            </div>

                            <div 
                                className="chosenColor"
                                value={this.state.color1}
                                name="color1"
                            >
                                <div className="colorText">
                                    {this.state.color1.colorName}
                                </div>

                                <div className="circleIcon">
                                    { this.state.color1.colorHex == "transparent" ?
                                        <div />
                                        : 
                                        this.state.color1.colorHex == "white" ?
                                            <FontAwesomeIcon icon={faCircle} style={{color: '#C4C4C4'}} />
                                            :   
                                            <FontAwesomeIcon icon={solidCircle} style={{color: this.state.color1.colorHex}} />
                                    }
                                </div>
                            </div>
                        </div>

                        { this.state.activeColorNumber == "color1" ?
                            <div className="colorWrapper">
                                {this.colorChoices()}
                            </div>
                            :
                            <div />
                        }
                    </div>

                    <div 
                        className="colorElementsWrapper inactiveColorOptions"
                        id="color2"
                    >
                        <div 
                            className="staticColorElementsWrapper"
                            name="color2"
                            onClick={this.handleColorNumber}
                        >
                            <div 
                                className="colorText"   
                            >
                                Color Two:
                            </div>

                            <div 
                                className="chosenColor"
                                value={this.state.color2} 
                                name="color2"    
                            >
                                <div className="colorText">
                                    {this.state.color2.colorName}
                                </div>

                                <div className="circleIcon">
                                    { this.state.color2.colorHex == "transparent" ?
                                        <div />
                                        : 
                                        this.state.color2.colorHex == "white" ?
                                            <FontAwesomeIcon icon={faCircle} style={{color: '#C4C4C4'}} />
                                            :   
                                            <FontAwesomeIcon icon={solidCircle} style={{color: this.state.color2.colorHex}} />
                                    }
                                </div>
                            </div>
                        </div>

                        { this.state.activeColorNumber == "color2" ?
                            <div className="colorWrapper">
                                {this.colorChoices()}
                            </div>
                            :
                            <div />
                        }
                    </div>

                    { this.state.size == "double" ?
                        <div>
                            <div 
                                className="colorElementsWrapper inactiveColorOptions"
                                id="color3"    
                            >
                                <div 
                                    className="staticColorElementsWrapper"
                                    name="color3"
                                    onClick={this.handleColorNumber} 
                                >
                                    <div className="colorText">
                                        Color Three:
                                    </div>

                                    <div 
                                        className="chosenColor"
                                        value={this.state.color3} 
                                        name="color3"    
                                    >
                                        <div className="colorText">
                                            {this.state.color3.colorName}
                                        </div>

                                        <div className="circleIcon">
                                            { this.state.color3.colorHex == "transparent" ?
                                                <div />
                                                : 
                                                this.state.color3.colorHex == "white" ?
                                                    <FontAwesomeIcon icon={faCircle} style={{color: '#C4C4C4'}} />
                                                    :   
                                                    <FontAwesomeIcon icon={solidCircle} style={{color: this.state.color3.colorHex}} />
                                            }
                                        </div>
                                    </div>
                                </div>

                                { this.state.activeColorNumber == "color3" ?
                                    <div className="colorWrapper">
                                        {this.colorChoices()}
                                    </div>
                                    :
                                    <div />
                                }
                            </div>

                            <div 
                                className="colorElementsWrapper inactiveColorOptions"
                                id="color4"
                            >
                                <div 
                                    className="staticColorElementsWrapper"
                                    name="color4"
                                    onClick={this.handleColorNumber}    
                                >
                                    <div className="colorText">
                                        Color Four:
                                    </div>

                                    <div 
                                        className="chosenColor"
                                        value={this.state.color4} 
                                        name="color4"
                                    >
                                        <div className="colorText">
                                            {this.state.color4.colorName}
                                        </div>

                                        <div className="circleIcon">
                                            { this.state.color4.colorHex == "transparent" ?
                                                <div />
                                                : 
                                                this.state.color4.colorHex == "white" ?
                                                    <FontAwesomeIcon icon={faCircle} style={{color: '#C4C4C4'}} />
                                                    :   
                                                    <FontAwesomeIcon icon={solidCircle} style={{color: this.state.color4.colorHex}} />
                                            }
                                        </div>
                                    </div>
                                </div>

                                { this.state.activeColorNumber == "color4" ?
                                    <div className="colorWrapper">
                                        {this.colorChoices()}
                                    </div>
                                    :
                                    <div />
                                }
                            </div>
                        </div>
                        : 
                        <div>

                        </div>
                    }
                </div>
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

                    <div className="price">
                        {`$${this.state.weavePrice * this.state.qty}.00`}
                    </div>

                    <button className="addToCart disabled" id="addToCart" onClick={this.handleSubmit}>Add To Cart</button>     
            </div>
        );
    }
}