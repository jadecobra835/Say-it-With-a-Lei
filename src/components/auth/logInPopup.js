import React, { Component } from 'react';
 
export default class Popup extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div className="popupBody" style={{height: this.props.height, backgroundColor: this.props.color}}>
                { this.props.messageType ? 
                    <div className="popupText" style={{fontSize: this.props.textSize}}>
                        Success
                    </div>
                    :
                    <div className="popupText" style={{fontSize: this.props.textSize}}>
                        Wrong username or Password
                    </div>
                }
            </div>
        );
    }
}