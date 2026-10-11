import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/* Section text is plain text from the database: blank lines separate
   paragraphs, and a paragraph whose lines start with "•" is a list.
   It is rendered as text, never as HTML, so nothing in it can run as markup. */
function SectionBody({ text }) {
  const blocks = String(text || '').split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return blocks.map((block, i) => {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
    const bullets = lines.filter((l) => l.startsWith('•'));
    if (bullets.length > 0 && bullets.length === lines.length) {
      return (
        <ul key={i} className="mb-4 list-disc space-y-1.5 pl-5 marker:text-brand-600">
          {lines.map((l, j) => <li key={j}>{l.replace(/^•\s*/, '')}</li>)}
        </ul>
      );
    }
    return <p key={i} className="mb-4 whitespace-pre-line">{block}</p>;
  });
}

const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : null;

export default function LegalPage({ title, intro, fetchDocument, otherLink }) {
  const [doc, setDoc] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setDoc(await fetchDocument());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchDocument]);

  useEffect(() => {
    document.title = `${title} | QuickInfo`;
    load();
  }, [load, title]);

  const jump = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const sections = doc?.sections || [];

  return (
    <div className="pb-24 pt-32">
      <div className="container-page">
        <header className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Legal</span>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed">{intro}</p>
          {doc?.last_updated && (
            <p className="mt-4 text-sm font-semibold text-ink-400">Last updated: {formatDate(doc.last_updated)}</p>
          )}
        </header>

        <div className="mt-12">
          {loading ? (
            <div className="flex flex-col items-center gap-4 py-24" role="status">
              <span className="h-10 w-10 animate-spin rounded-full border-4 border-ink-100 border-t-brand-700" />
              <span className="text-sm font-semibold text-ink-400">Loading document…</span>
            </div>
          ) : error ? (
            <div className="mx-auto max-w-md rounded-2xl border border-red-200 bg-red-50 p-8 text-center" role="alert">
              <p className="font-bold text-ink-900">{error}</p>
              <button type="button" onClick={load} className="btn-outline mt-6">Try again</button>
            </div>
          ) : sections.length === 0 ? (
            <p className="py-24 text-center font-semibold text-ink-400">This document is not available yet.</p>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
              <aside className="hidden lg:block">
                <nav className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto" aria-label="On this page">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-ink-900">On this page</p>
                  <ol className="space-y-1 border-l border-ink-100">
                    {sections.map((s, i) => (
                      <li key={s.id}>
                        <a
                          href={`#section-${s.id}`}
                          onClick={(e) => jump(e, `section-${s.id}`)}
                          className="-ml-px block border-l-2 border-transparent py-1 pl-4 text-sm text-ink-500 transition hover:border-brand-600 hover:text-ink-900"
                        >
                          {i + 1}. {s.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>

              <article className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card sm:p-10">
                {sections.map((s, i) => (
                  <section key={s.id} id={`section-${s.id}`} className="border-b border-ink-50 py-6 first:pt-0 last:border-0 last:pb-0">
                    <h2 className="mb-3 text-xl font-extrabold">
                      <span className="mr-2 text-brand-700">{i + 1}.</span>
                      {s.title}
                    </h2>
                    <div className="text-[15px] leading-relaxed text-ink-500">
                      <SectionBody text={s.description} />
                    </div>
                  </section>
                ))}
                <p className="mt-8 rounded-xl bg-ink-50 p-4 text-sm">
                  Please also read our <Link to={otherLink.to} className="font-bold text-brand-700 underline">{otherLink.label}</Link>.
                  Questions? <Link to="/#contact" className="font-bold text-brand-700 underline">Contact us</Link>.
                </p>
              </article>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
