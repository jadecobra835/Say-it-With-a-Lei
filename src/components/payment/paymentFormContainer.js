import React from 'react';
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './paymentForm';

const PUBLIC_KEY = "pk_test_51PK34NGDzZ4Hs4RWlUWqucvN3XbzvduTjKSSxf3p7G7xItTcoHwId5sb3Ywl7EbZONEtbo5yQ18VgOWkNIPePLB900uPVaXNQk"

const stripeTestPromise = loadStripe(PUBLIC_KEY)
 
export default function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    );
}