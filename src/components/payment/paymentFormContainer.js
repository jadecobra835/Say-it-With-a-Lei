import React from 'react';
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js';

import PaymentForm from './paymentForm';

const stripePromise = loadStripe("pk_test_51PK34NGDzZ4Hs4RWlUWqucvN3XbzvduTjKSSxf3p7G7xItTcoHwId5sb3Ywl7EbZONEtbo5yQ18VgOWkNIPePLB900uPVaXNQk")

export default function Payment(props) {
    const totalPrice = props.totalPrice()

    const options = {
        mode: 'payment',
        amount: 1099,
        currency: 'usd',
        appearance: {
            variables: {
                fontFamily: 'Roboto, sans-serif',
                tabIconColor: '#999999',
                tabIconHoverColor: '#999999',
                tabIconSelectedColor: '#999999',
                iconCheckmarkColor: '#ffffff',
                colorText: '#999999',
            },

            rules: {
                '.Label': {
                    opacity: '0'
                },

                '.Tab': {
                    border: '2px solid #AAD056',
                    transition: 'ease-in-out 0.5s'
                },

                '.Tab:hover': {
                    boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.3)'
                },

                '.Tab:focus': {
                    outline: 'none'
                },

                '.Tab--selected': {
                    border: '2px solid #64C6B9',
                    boxShadow: 'none'
                },

                '.Tab--selected:focus': {
                    borderColor: '#64C6B9',
                    boxShadow: 'none'
                },

                '.TabLabel': {
                    fontWeight: 'normal',
                    color: '#999999'
                },

                '.TabLabel--selected': {
                    color: '#999999'
                },

                '.Input': {
                    borderBottom: '2px solid #AAD056'
                },

                '.Input:focus': {
                    outline: 'none',
                    boxShadow: 'none',
                    borderColor: 'none',
                    borderBottom: '2px solid #64C6B9'
                },
            }
        },
    };
    
    return (
        <Elements stripe={stripePromise} options={options}>
            <PaymentForm />
        </Elements>
    );
}