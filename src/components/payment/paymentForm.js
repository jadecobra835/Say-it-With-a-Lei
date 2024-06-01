import React, {useState} from 'react';
import {useStripe, useElements, PaymentElement, AddressElement} from '@stripe/react-stripe-js';

const options = {mode: 'shipping'}

export default function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(false);

    const handleError = (error) => {
        setLoading(false);
        setErrorMessage(error.message);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

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
        })

        const {client_secret: clientSecret} = await res.json()

        // Confirm the PaymentIntent using the details collected by the Payment Element
        const {error} = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: 'http://localhost:3000/'
            },
        });

        if (error) {
            // This point is only reached if there's an immediate error when
            // confirming the payment.
            handleError(error);
        } else {

        }
    };
    
    return (
        <div className="paymentFormWrapper">
            <div className="heading">
                <h1>Payment</h1>
            </div>

            <form onSubmit={handleSubmit} className="paymentForm">
                <div className="subHeading">
                    Shipping Address
                </div>

                <AddressElement options={options} />
                
                <div className="subHeading">
                    Payment Method
                </div>

                <PaymentElement />

                <button type="submit" className="submitBtn" disabled={!stripe || loading}>
                    Complete Checkout
                </button>
                {errorMessage && <div>{errorMessage}</div>}
            </form>
        </div>
    )
}