import React, { Component } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircle as BorderCircle } from '@fortawesome/free-regular-svg-icons';

export default class ColorItem extends Component {
    constructor(props) {
        super(props);

    };
   
    render() {
        const { id, colorName, colorHex } = this.props.item
        return (
            <div className="colorItemWrapper" id={id} onClick={() => {this.props.clickFunction(id)}}>
                
                { colorHex == "transparent" || colorHex == "white"  ?
                    <div className="colorCircleWrapper">
                        <FontAwesomeIcon icon={BorderCircle} style={{color: '#C4C4C4'}}/>
                    </div>
                    :
                    <div className="colorCircleWrapper">
                        <FontAwesomeIcon icon={faCircle} style={{color: colorHex}}/>
                    </div>
                }
                
                <div className="colorTextWrapper">
                    {colorName}
                </div>
            </div>
        );
    }
}