import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm.jsx';
import { getServices } from '../lib/api.js';

const CHANNELS = {
  whatsapp: { label: 'WhatsApp', className: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
  web: { label: 'Web', className: 'bg-sky-50 text-sky-700 ring-sky-200' },
  whatsapp_web: { label: 'WhatsApp + Web', className: 'bg-brand-50 text-brand-800 ring-brand-200' },
};

const STEPS = [
  { title: 'Tell us what you need', text: 'Share your idea or workflow through the contact form. We reply with a clear plan and price.' },
  { title: 'We build and connect it', text: 'We set up your WhatsApp flows and web screens, connected to your data and payment gateway.' },
  { title: 'Your customers just use it', text: 'They chat on WhatsApp or open a link. No new app to install, no learning curve.' },
];

function ChatPreview() {
  const bubble = 'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm';
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-brand-100/60 blur-2xl" />
      <div className="overflow-hidden rounded-[2rem] border border-ink-100 bg-white shadow-card-lg">
        <div className="flex items-center gap-3 bg-brand-800 px-5 py-4 text-white">
          <img src="/favicon.svg" alt="" className="h-9 w-9 rounded-full bg-white p-1" />
          <div>
            <p className="text-sm font-bold">Your Business</p>
            <p className="text-[11px] text-brand-100">Powered by QuickInfo</p>
          </div>
        </div>
        <div className="space-y-3 bg-[#efeae2] px-4 py-5">
          <div className={`${bubble} ml-auto bg-[#d9fdd3] text-ink-900`}>Hi, is my booking confirmed?</div>
          <div className={`${bubble} bg-white text-ink-900`}>
            Yes! Booking <b>#QI-2041</b> is confirmed for Sat, 10:30 AM. 🎟️
          </div>
          <div className={`${bubble} bg-white text-ink-900`}>Here is your digital ticket. Show the QR code at entry.</div>
          <div className={`${bubble} ml-auto bg-[#d9fdd3] text-ink-900`}>Thank you 🙏</div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [services, setServices] = useState([]);
  const [servicesError, setServicesError] = useState('');

  useEffect(() => {
    document.title = 'QuickInfo | WhatsApp & Web Solutions';
    getServices().then(setServices).catch((e) => setServicesError(e.message));
  }, []);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="dot-grid relative overflow-hidden pb-20 pt-32 sm:pt-40">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="eyebrow">SaaS for WhatsApp &amp; Web</span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] sm:text-6xl">
              Serve your customers <span className="text-brand-700">where they already are.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed">
              QuickInfo turns WhatsApp and the web into your business's front desk: instant answers, alerts,
              bookings, payments and portals, without asking anyone to install a new app.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/#contact" className="btn-primary">Talk to us</Link>
              <Link to="/#solutions" className="btn-outline">Explore solutions</Link>
            </div>
          </div>
          <ChatPreview />
        </div>
      </section>

      {/* ── Solutions ────────────────────────────────────────── */}
      <section id="solutions" className="bg-ink-50/60 py-20 sm:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <span className="eyebrow">Solutions</span>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">One platform, two channels your customers trust</h2>
            <p className="mt-4 text-base leading-relaxed">Pick a ready solution or combine them. Each one runs on WhatsApp, on the web, or both.</p>
          </div>

          {servicesError ? (
            <p className="mt-10 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700" role="alert">{servicesError}</p>
          ) : (
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {(services.length ? services : Array.from({ length: 6 }, (_, i) => ({ id: `s${i}` }))).map((s) => (
                <article key={s.id} className="flex flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-card-lg">
                  {s.name ? (
                    <>
                      <span className={`self-start rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${CHANNELS[s.channel]?.className || ''}`}>
                        {CHANNELS[s.channel]?.label || s.channel}
                      </span>
                      <h3 className="mt-4 text-lg font-extrabold">{s.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed">{s.summary}</p>
                      {Array.isArray(s.features) && s.features.length > 0 && (
                        <ul className="mt-4 space-y-1.5 border-t border-ink-50 pt-4 text-sm">
                          {s.features.map((f) => (
                            <li key={f} className="flex gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-brand-600" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <div className="animate-pulse space-y-3" aria-hidden="true">
                      <div className="h-5 w-20 rounded-full bg-ink-50" />
                      <div className="h-5 w-2/3 rounded bg-ink-50" />
                      <div className="h-16 rounded bg-ink-50" />
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 sm:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">How it works</span>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">From idea to live in three steps</h2>
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="rounded-2xl border border-ink-100 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-700 text-lg font-extrabold text-white">{i + 1}</span>
                <h3 className="mt-5 text-lg font-extrabold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────── */}
      <section id="contact" className="bg-gradient-to-b from-brand-50/70 to-white py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <span className="eyebrow">Contact</span>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Let's build your WhatsApp &amp; web solution</h2>
            <p className="mt-4 text-base leading-relaxed">
              Tell us a little about your business and what you want to automate.
            </p>
            <ul className="mt-8 space-y-3 text-sm font-semibold text-ink-700">
              <li className="flex gap-3"><span className="text-brand-700">✓</span> No obligation, clear pricing</li>
              <li className="flex gap-3"><span className="text-brand-700">✓</span> Approved WhatsApp Business templates</li>
              <li className="flex gap-3"><span className="text-brand-700">✓</span> Your data handled under India's DPDP Act</li>
            </ul>
          </div>
          <ContactForm services={services} />
        </div>
      </section>
    </>
  );
}
