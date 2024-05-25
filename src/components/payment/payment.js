import React, { Component } from 'react';
import StripeContainer from './paymentFormContainer';
 
export default class Payment extends Component {
    render() {
        return (
            <div>
                <StripeContainer />
            </div>
        );
    }
}