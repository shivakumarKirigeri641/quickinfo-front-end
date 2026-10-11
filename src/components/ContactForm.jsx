import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getQueryTypes, submitContactQuery } from '../lib/api.js';

const EMPTY = {
  user_name: '',
  mobile_number: '',
  email: '',
  business_name: '',
  query_type_id: '',
  service_id: '',
  message: '',
  accept_policies: false,
  whatsapp_opt_in: false,
};

/* Same rules as the server's validator, so most mistakes are caught before sending. */
function validate(f) {
  const e = {};
  const name = f.user_name.trim();
  if (name.length < 2 || name.length > 100) e.user_name = 'Enter your name (2 to 100 characters).';
  if (!/^[6-9]\d{9}$/.test(f.mobile_number.trim())) e.mobile_number = 'Enter a valid 10-digit Indian mobile number.';
  if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = 'Enter a valid email address.';
  if (!f.query_type_id) e.query_type_id = 'Choose a query type.';
  const msg = f.message.trim();
  if (msg.length < 10 || msg.length > 1000) e.message = 'Write 10 to 1000 characters.';
  if (!f.accept_policies) e.accept_policies = 'Please accept the Privacy Policy and Terms & Conditions.';
  return e;
}

function Field({ id, label, error, optional, children }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} {optional && <span className="font-normal text-ink-300">(optional)</span>}
      </label>
      {children}
      {error && <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-red-600">{error}</p>}
    </div>
  );
}

export default function ContactForm({ services }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [queryTypes, setQueryTypes] = useState([]);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  useEffect(() => {
    getQueryTypes().then(setQueryTypes).catch(() => setQueryTypes([]));
  }, []);

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: key === 'mobile_number' ? value.replace(/\D/g, '').slice(0, 10) : value }));
    if (errors[key]) setErrors((x) => ({ ...x, [key]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    setStatus({ state: 'sending', message: '' });
    try {
      const saved = await submitContactQuery({
        ...form,
        query_type_id: Number(form.query_type_id),
        service_id: form.service_id ? Number(form.service_id) : null,
      });
      setStatus({ state: 'sent', message: `Your reference number is #${saved.reference_id}.` });
      setForm(EMPTY);
    } catch (err) {
      setStatus({ state: 'error', message: err.message });
    }
  };

  const aria = (key) => ({
    id: key,
    'aria-invalid': Boolean(errors[key]),
    'aria-describedby': errors[key] ? `${key}-error` : undefined,
  });

  if (status.state === 'sent') {
    return (
      <div className="rounded-2xl border border-brand-200 bg-brand-50 p-8 text-center" role="status">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-700 text-white">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="mt-5 text-xl font-extrabold">Thank you! We have your query.</h3>
        <p className="mt-2">{status.message} We will get back to you soon.</p>
        <button type="button" className="btn-outline mt-6" onClick={() => setStatus({ state: 'idle', message: '' })}>
          Send another query
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-2xl border border-ink-100 bg-white p-6 shadow-card-lg sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="user_name" label="Your name" error={errors.user_name}>
          <input {...aria('user_name')} className="field" autoComplete="name" maxLength={100} value={form.user_name} onChange={set('user_name')} />
        </Field>
        <Field id="mobile_number" label="Mobile number" error={errors.mobile_number}>
          <div className="flex">
            <span className="flex items-center rounded-l-xl border border-r-0 border-ink-100 bg-ink-50 px-3 text-sm font-semibold text-ink-500">+91</span>
            <input {...aria('mobile_number')} className="field rounded-l-none" inputMode="numeric" autoComplete="tel-national" placeholder="10-digit number" value={form.mobile_number} onChange={set('mobile_number')} />
          </div>
        </Field>
        <Field id="email" label="Email" optional error={errors.email}>
          <input {...aria('email')} type="email" className="field" autoComplete="email" maxLength={254} value={form.email} onChange={set('email')} />
        </Field>
        <Field id="business_name" label="Business name" optional>
          <input id="business_name" className="field" autoComplete="organization" maxLength={120} value={form.business_name} onChange={set('business_name')} />
        </Field>
        <Field id="query_type_id" label="Query type" error={errors.query_type_id}>
          <select {...aria('query_type_id')} className="field" value={form.query_type_id} onChange={set('query_type_id')}>
            <option value="">Select a query type</option>
            {queryTypes.map((q) => <option key={q.id} value={q.id}>{q.query_type}</option>)}
          </select>
        </Field>
        <Field id="service_id" label="Solution you are interested in" optional>
          <select id="service_id" className="field" value={form.service_id} onChange={set('service_id')}>
            <option value="">Not sure yet</option>
            {services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </Field>
      </div>

      <Field id="message" label="Message" error={errors.message}>
        <textarea {...aria('message')} rows={4} className="field resize-y" maxLength={1000} placeholder="Tell us what you would like to build or automate" value={form.message} onChange={set('message')} />
        <p className="mt-1 text-right text-xs text-ink-300">{form.message.trim().length}/1000</p>
      </Field>

      <div className="space-y-3">
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" className="mt-0.5 h-4 w-4 accent-brand-700" checked={form.whatsapp_opt_in} onChange={set('whatsapp_opt_in')} />
          <span>Send me updates about my query on WhatsApp. I can reply STOP at any time.</span>
        </label>
        <div>
          <label className="flex items-start gap-3 text-sm">
            <input
              {...aria('accept_policies')}
              type="checkbox"
              className="mt-0.5 h-4 w-4 accent-brand-700"
              checked={form.accept_policies}
              onChange={set('accept_policies')}
            />
            <span>
              I have read and agree to the{' '}
              <Link to="/privacy-policy" target="_blank" className="font-bold text-brand-700 underline">Privacy Policy</Link> and{' '}
              <Link to="/terms-and-conditions" target="_blank" className="font-bold text-brand-700 underline">Terms &amp; Conditions</Link>.
            </span>
          </label>
          {errors.accept_policies && <p id="accept_policies-error" className="mt-1.5 text-sm font-medium text-red-600">{errors.accept_policies}</p>}
        </div>
      </div>

      {status.state === 'error' && (
        <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700" role="alert">{status.message}</p>
      )}

      <button type="submit" className="btn-primary w-full sm:w-auto" disabled={status.state === 'sending'}>
        {status.state === 'sending' ? 'Sending…' : 'Send query'}
      </button>
    </form>
  );
}
