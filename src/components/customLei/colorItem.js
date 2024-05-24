import React, { Component } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

export default class ColorItem extends Component {
    constructor(props) {
        super(props);
    };
   
    render() {
        const { id, colorName, colorHex } = this.props.item
        return (
            <div className="colorItemWrapper">
                <div className="colorCircleWrapper">
                    <FontAwesomeIcon icon={faCircle} style={{color: colorHex}}/>
                </div>
                
                <div className="colorTextWrapper">
                    {colorName}
                </div>
            </div>
        );
    }
}