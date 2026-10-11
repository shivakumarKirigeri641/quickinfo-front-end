import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import ContactDetails from './ContactDetails.jsx';
import { BUSINESS } from '../lib/business.js';

const sectionLinks = [
  { label: 'Solutions', to: '/#solutions' },
  { label: 'How it works', to: '/#how-it-works' },
  { label: 'Contact', to: '/#contact' },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition ${
        scrolled || open ? 'border-ink-100 bg-white/90 backdrop-blur-lg' : 'border-transparent bg-transparent'
      }`}
    >
      <nav className="container-page flex h-[72px] items-center justify-between" aria-label="Main">
        <Link to="/" aria-label="QuickInfo home">
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {sectionLinks.map((l) => (
            <Link key={l.to} to={l.to} className="rounded-lg px-4 py-2 text-sm font-semibold text-ink-500 transition hover:bg-ink-50 hover:text-ink-900">
              {l.label}
            </Link>
          ))}
          <Link to="/#contact" className="btn-primary ml-3 !py-2.5">Get started</Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink-900 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink-100 bg-white md:hidden">
          <div className="container-page flex flex-col py-4">
            {sectionLinks.map((l) => (
              <Link key={l.to} to={l.to} className="border-b border-ink-50 py-3 text-base font-semibold text-ink-900">
                {l.label}
              </Link>
            ))}
            <Link to="/#contact" className="btn-primary mt-4">Get started</Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const legal = ({ isActive }) => `text-sm font-semibold transition hover:text-white ${isActive ? 'text-white' : 'text-ink-300'}`;
  return (
    <footer className="bg-ink-900 text-ink-300">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1.3fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Digital solutions your customers already know how to use: on WhatsApp and on the web.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white">Platform</h4>
          <ul className="space-y-2.5">
            {sectionLinks.map((l) => (
              <li key={l.to}><Link to={l.to} className="text-sm font-semibold hover:text-white">{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white">Legal</h4>
          <ul className="space-y-2.5">
            <li><NavLink to="/privacy-policy" className={legal}>Privacy Policy</NavLink></li>
            <li><NavLink to="/terms-and-conditions" className={legal}>Terms &amp; Conditions</NavLink></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white">Contact</h4>
          <ContactDetails variant="dark" />
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} QuickInfo. All rights reserved.</p>
          <p>Operated by {BUSINESS.legalName}, India.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
