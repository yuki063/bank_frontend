import React from 'react';
import { IbanElement } from '@stripe/react-stripe-js';
function SepaElement(props) {
  const IBAN_STYLE = {
    base: {
      color: '#707070',
      fontSize: '14px',
      '::placeholder': {
        color: '#707070',
      },
      ':-webkit-autofill': {
        color: '#707070',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
      ':-webkit-autofill': {
        color: '#fa755a',
      },
    },
  };
  const IBAN_ELEMENT_OPTIONS = {
    supportedCountries: ['SEPA'],
    placeholderCountry: 'DE',
    style: IBAN_STYLE,
  };
  return <IbanElement options={IBAN_ELEMENT_OPTIONS} />;
}
export default SepaElement;
