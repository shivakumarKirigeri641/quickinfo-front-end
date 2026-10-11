import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  useEffect(() => { document.title = 'Page not found | QuickInfo'; }, []);
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
      <p className="text-7xl font-extrabold text-brand-700">404</p>
      <h1 className="mt-4 text-2xl font-extrabold">This page does not exist</h1>
      <p className="mt-2">The link may be broken, or the page may have moved.</p>
      <Link to="/" className="btn-primary mt-8">Back to home</Link>
    </div>
  );
}
