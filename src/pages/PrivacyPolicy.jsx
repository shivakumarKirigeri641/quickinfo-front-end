import React from 'react';
import LegalPage from '../components/LegalPage.jsx';
import { getPrivacyPolicy } from '../lib/api.js';

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="How QuickInfo collects, uses, shares and protects your personal data across our WhatsApp based and web based solutions."
      fetchDocument={getPrivacyPolicy}
      otherLink={{ to: '/terms-and-conditions', label: 'Terms & Conditions' }}
    />
  );
}
