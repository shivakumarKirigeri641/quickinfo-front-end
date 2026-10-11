import React from 'react';

export default function Logo({ light = false }) {
  return (
    <span className="flex items-center gap-2.5">
      <img src="/favicon.svg" alt="" className="h-9 w-9" />
      <span className="flex flex-col leading-none">
        <span className={`text-[17px] font-extrabold tracking-tight ${light ? 'text-white' : 'text-ink-900'}`}>
          Quick<span className={light ? 'text-brand-300' : 'text-brand-700'}>Info</span>
        </span>
        <span className={`mt-1 text-[9px] font-bold uppercase tracking-[0.2em] ${light ? 'text-ink-300' : 'text-ink-400'}`}>
          WhatsApp &amp; Web
        </span>
      </span>
    </span>
  );
}
