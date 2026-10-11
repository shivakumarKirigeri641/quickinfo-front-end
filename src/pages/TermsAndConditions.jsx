import React from 'react';
import LegalPage from '../components/LegalPage.jsx';
import { getTermsAndConditions } from '../lib/api.js';

export default function TermsAndConditions() {
  return (
    <LegalPage
      title="Terms & Conditions"
      intro="The terms that govern your use of QuickInfo's website, WhatsApp based solutions and web based solutions."
      fetchDocument={getTermsAndConditions}
      otherLink={{ to: '/privacy-policy', label: 'Privacy Policy' }}
    />
  );
}
