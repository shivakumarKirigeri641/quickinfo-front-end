/**
 * business.js — the business's public contact details, shown in the Contact
 * section and the footer.
 *
 * Meta's WhatsApp review and business verification compare these with the
 * business portfolio, so they must match the registration documents exactly.
 * Set them in .env (VITE_BUSINESS_*). A field left empty is simply not shown.
 */
const env = import.meta.env;
const clean = (v) => (typeof v === 'string' ? v.trim() : '');

export const BUSINESS = {
  legalName: clean(env.VITE_BUSINESS_LEGAL_NAME) || 'ServerPe App Solutions',
  email: clean(env.VITE_BUSINESS_EMAIL) || 'support@quickinfo.in',
  // Digits with country code, e.g. 919876543210. Shown as +91 98765 43210.
  phone: clean(env.VITE_BUSINESS_PHONE).replace(/\D/g, ''),
  // Use "|" to break lines, e.g. "No. 12, 1st Main|Indiranagar|Bangalore 560038".
  address: clean(env.VITE_BUSINESS_ADDRESS) || 'Bangalore, Karnataka, India',
  hours: clean(env.VITE_BUSINESS_HOURS),
};

/** 919876543210 -> +91 98765 43210 */
export const formatPhone = (digits) => {
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return digits ? `+${digits}` : '';
};

export const addressLines = (address) => address.split('|').map((l) => l.trim()).filter(Boolean);
