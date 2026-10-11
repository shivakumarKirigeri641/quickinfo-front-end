# quickinfo-front-end

Website for **QuickInfo**, a SaaS platform for WhatsApp based and web based solutions. It is built with Vite, React 18, Tailwind CSS 3 and React Router 6, the same stack as the newer ServerPe front ends.

## Pages

| Route | Content |
| --- | --- |
| `/` | Hero, solutions loaded from the API, how it works, and the contact form |
| `/privacy-policy` | Privacy Policy loaded from the API, with a table of contents and last-updated date |
| `/terms-and-conditions` | Terms & Conditions loaded from the API |

Policy text comes from the database through `quickinfo-back-end`. It is rendered as plain text, never as HTML. A blank line starts a new paragraph, and lines starting with `•` become a list.

## Setup

```bash
npm install
cp .env.example .env   # set VITE_SECRET_KEY to the back end's SECRET_KEY
npm run dev            # http://localhost:5180, with /api proxied to http://localhost:7788
npm run build          # production build in dist/
```

For production, set `VITE_API_BASE` to the back end's full URL including `/api`. Also add the site's origin to `CORS_ORIGINS` in the back end. The host must serve `index.html` for unknown paths, so that `/privacy-policy` works on reload.
