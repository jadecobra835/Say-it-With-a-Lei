import React, { Component } from 'react';


import GraduationModal from './modals/graduationModal';
 
export default class Graduation extends Component {
    constructor() {
        super()

        this.state = {
            modalStatus: false
        }

        this.modalStatus = this.modalStatus.bind(this);
    }

    modalStatus() {
        if (this.state.modalStatus == false) {
            this.setState({
                modalStatus: true
            });
        } else if (this.state.modalStatus == true) {
            this.setState({
                modalStatus: false
            });
        };
    };

    
    render() {
        return (
            <div>
                <button onClick={this.modalStatus}>Open Modal</button>
                <GraduationModal
                    modalStatus={this.state.modalStatus}  
                    modalOff={this.modalStatus}
                />
            </div>
        );
    }
}