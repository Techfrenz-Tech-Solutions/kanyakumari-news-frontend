# Kanyakumari Today - Public News Portal

React 18 + Vite public frontend for Kanyakumari Today.

The backend is the canonical source for public content. Integrated public features call the hardened Kanyakumari backend through the central API client in `src/api/client.js` and service facade in `src/services/newsService.js`.

## Run

```bash
npm install
npm run dev
npm run build
npm run lint
npm test
```

## Configuration

Set `VITE_API_BASE_URL` when the backend is not served from the same origin.

Examples:

```bash
VITE_API_BASE_URL=http://127.0.0.1:3001 npm run dev
VITE_API_BASE_URL=https://api.example.com npm run build
```

If `VITE_API_BASE_URL` is empty, the frontend requests `/api` on the current origin. Production hosting must route these paths to the backend:

```text
/api/*
/uploads/*
/sitemap.xml
/robots.txt
```

## Integrated Backend Features

- Home aggregates, hero, latest, category rails, breaking headlines, trending, gallery, videos, jobs, weather, district info, and tourist attractions.
- Category pages request backend category and area content.
- Search sends query, category, sort, and limit parameters to the backend.
- Article pages render backend article detail, media, author, tags, approved comments, related content, and runtime SEO metadata.
- Contact form submits to the backend.

## Notes

- `public/news-placeholder.svg` is the single intentional local fallback image for missing media.
- Some non-news references remain static by design, such as travel tips and hotel links on the tourist information page.
- This is still a Vite SPA. Runtime document metadata is updated for users and client-side crawlers, but full production SEO needs Step 5 hosting support for backend sitemap/robots routing and, if required, SSR/prerendering.

## Validation

```bash
npm test
npm run lint
npm run build
```

The browser E2E test is available for a full admin-to-public round trip:

```bash
KKN_ADMIN_EMAIL=<admin email> \
KKN_ADMIN_PASSWORD=<admin password> \
KKN_ADMIN_URL=http://127.0.0.1:5173 \
KKN_API_URL=http://127.0.0.1:3001 \
KKN_PUBLIC_URL=http://127.0.0.1:4173 \
node scripts/step4-browser.mjs
```
