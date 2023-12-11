import React from 'react';
import SepaElement from './SepaElement';
import axios from 'axios';
import axios, { endpoints } from 'src/utils/axios';
import { useStripe, useElements, IbanElement } from '@stripe/react-stripe-js';
function Sepa(props) {
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!stripe || !elements) {
        // Stripe.js has not yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
      const sepaPayment = await stripe.createPaymentMethod({
        type: 'sepa_debit',
        sepa_debit: elements.getElement(IbanElement),
        billing_details: {
          email: 'rudrakshdixit@gmail.com', //collect this from user
          name: 'rudra', //collect this from user
        },
      });
      const res = await axios.post(endpoints.auth.IBAN, {
        payment_method: sepaPayment.paymentMethod.id,
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form
      style={{
        width: '30%',
        margin: 'auto',
        marginTop: '2rem',
        border: '1px solid red',
        padding: '1rem',
      }}
    >
      <SepaElement />
      <button
        onClick={handleSubmit}
        disabled={!stripe}
        style={{
          color: 'white',
          backgroundColor: 'red',
          textAlign: 'center',
          width: '100%',
          padding: '1rem',
          marginTop: '2rem',
          cursor: 'pointer',
        }}
      >
        Pay
      </button>
    </form>
  );
}
export default Sepa;
