import React from 'react';
import { BUSINESS, addressLines, formatPhone } from '../lib/business.js';

const Icon = ({ d }) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

const ICONS = {
  email: 'M4 6h16v12H4zM4 7l8 6 8-6',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2',
  address: 'M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  hours: 'M12 7v5l3 2M12 21a9 9 0 100-18 9 9 0 000 18z',
};

/**
 * The business's contact details. `variant="dark"` is for the footer.
 * Fields that are not configured are left out rather than shown empty.
 */
export default function ContactDetails({ variant = 'light' }) {
  const dark = variant === 'dark';
  const phone = formatPhone(BUSINESS.phone);

  const rows = [
    { key: 'email', label: 'Email', value: BUSINESS.email, href: `mailto:${BUSINESS.email}` },
    phone && { key: 'phone', label: 'Phone', value: phone, href: `tel:+${BUSINESS.phone}` },
    { key: 'address', label: 'Address', lines: addressLines(BUSINESS.address) },
    BUSINESS.hours && { key: 'hours', label: 'Hours', value: BUSINESS.hours },
  ].filter(Boolean);

  return (
    <address className="not-italic">
      {!dark && <p className="mb-4 text-sm font-bold text-ink-900">{BUSINESS.legalName}</p>}
      <ul className="space-y-4">
        {rows.map((r) => (
          <li key={r.key} className="flex gap-3">
            <span
              className={`flex h-9 w-9 flex-none items-center justify-center rounded-lg ${
                dark ? 'bg-white/10 text-brand-300' : 'bg-brand-50 text-brand-700'
              }`}
            >
              <Icon d={ICONS[r.key]} />
            </span>
            <span className="min-w-0 text-sm">
              <span className={`block text-xs font-bold uppercase tracking-[0.12em] ${dark ? 'text-ink-300' : 'text-ink-400'}`}>
                {r.label}
              </span>
              {r.href ? (
                <a href={r.href} className={`break-words font-semibold hover:underline ${dark ? 'text-white' : 'text-ink-900'}`}>
                  {r.value}
                </a>
              ) : r.lines ? (
                r.lines.map((l) => (
                  <span key={l} className={`block font-semibold ${dark ? 'text-white' : 'text-ink-900'}`}>{l}</span>
                ))
              ) : (
                <span className={`font-semibold ${dark ? 'text-white' : 'text-ink-900'}`}>{r.value}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </address>
  );
}
