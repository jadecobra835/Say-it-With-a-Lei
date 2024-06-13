import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import {useStripe, useElements, useCustomCheckout, PaymentElement, AddressElement, ExpressCheckoutElement, CustomCheckoutProvider} from '@stripe/react-stripe-js';

const options = {mode: 'shipping'}

export default function PaymentForm(props) {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const handleError = (error) => {
        setLoading(false);
        setErrorMessage(error.message);
    }

    const handleChange = (event) => {
        setEmail(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const cartItems = props.cartItems

        let description = ''
    
        for (let item in cartItems) {
            const cartItem = cartItems[item]
    
            if (cartItem.type == 'custom') {
                if (cartItem.size == 'single') {
                    description += `Custom Lei: \n   Weave = ${cartItem.size}, \n   Color1 = ${cartItem.color1.colorName}, \n   Color2 = ${cartItem.color2.colorName}, \n   Qty = ${cartItem.qty}.\n`
                } else {
                    description += `Custom Lei: \n   Weave = ${cartItem.size}, \n   Color1 = ${cartItem.color1.colorName}, \n   Color2 = ${cartItem.color2.colorName}, \n   Color3 = ${cartItem.color3.colorName}, \n   Color4 = ${cartItem.color4.colorName}, \n   Qty = ${cartItem.qty}.\n`
                }
            } else {
                description += `Premade Lei: \n   Name: ${cartItem.leiItem.name}, \n   Qty: ${cartItem.qty}.\n`
            }
        }


        if (!stripe) {
            // Stripe.js hasn't yet loaded
            // Make sure to disable form submission until Stripe.js has loaded
            return;
        }

        setLoading(true);

        // Trigger form validation and wallet collection
        const {error: submitError} = await elements.submit()
        if (submitError) {
            handleError(submitError);
            return;
        }

        // Create the PaymentIntent and obtain clientSecret
        const res = await fetch("http://localhost:4000/create-intent", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "amount": (props.totalPrice * 100),
                "receipt_email": email,
                "description": description
            }),
        }).then(function(response) {
            return response.json()
        }).then(function(data) {
            return data
        })

        const intent = await res

        // Confirm the PaymentIntent using the details collected by the Payment Element
        const {error} = await stripe.confirmPayment({
            elements,
            clientSecret: intent.client_secret,
            confirmParams: {
                return_url: 'http://localhost:3000/success'
            },
        });

        if (error) {
            // This point is only reached if there's an immediate error when
            // confirming the payment.
            handleError(error);
        } else {
            setLoading(false);
        }
    };
    
    return (
        <div className="paymentFormWrapper">
            <div className="heading">
                <h1>Payment</h1>
            </div>

            <input
                type="email"
                placeholder='Email'
                onChange={handleChange}
                value={email}
            />

            <form onSubmit={handleSubmit} className="paymentForm">
                <div className="subHeading">
                    Shipping Address
                </div>

                <AddressElement options={options} />
                
                <div className="subHeading">
                    Payment Method
                </div>

                <ExpressCheckoutElement />

                <PaymentElement />

                <div className="total">
                    {`Total: $${props.totalPrice}.00`}
                </div>

                {errorMessage && <div className="paymentFormErrorMessage">{errorMessage}</div>}

                <button type="submit" className="submitBtn" disabled={!stripe || loading}>
                    Complete Checkout
                </button>
            </form>
        </div>
    )
}