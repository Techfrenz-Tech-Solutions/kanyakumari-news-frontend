/**
 * SEO Site Configuration — Kanyakumari Today
 * -----------------------------------------------------------------------------
 * Central, import-only config for metadata, sitemaps, robots, schema, AEO and
 * GEO layers. Per the MASTER RULES this file is NOT imported by any UI
 * component — only by metadata / schema / route-handler / build-time code.
 *
 * All values here are sourced from the actual repo (SEO_AUDIT.md), not invented.
 * TODO markers flag items the owner must confirm (social URLs, Tamil brand name,
 * the missing og-image.jpg, contact details).
 *
 * NOTE on site URL: the repo currently hardcodes https://www.kanyakumaritoday.com
 * across index.html, robots.txt, sitemap.xml and the sitemap script, with NO
 * site-URL env var. This config introduces VITE_SITE_URL as the single override
 * point, defaulting to the canonical www URL already in use.
 */

import { META_KEYWORDS } from './keywords.js';

/* Canonical site URL. Strip a trailing slash so absoluteUrl() can join cleanly. */
const SITE_URL = (
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SITE_URL) ||
  'https://www.kanyakumaritoday.com'
).replace(/\/$/, '');

export const SITE = {
  url: SITE_URL,
  /* metadataBase — the absolute origin page canonical/OG URLs resolve against.
     The SPA's UI-facing SEO helper (src/utils/seo.js) mirrors this value so it
     does not pull the build-time config layer into the client bundle. */
  metadataBase: SITE_URL,
  name: 'Kanyakumari Today',
  tamilName: 'கன்னியாகுமரி டுடே', // TODO: owner to confirm official Tamil brand rendering
  /* Max 160 chars. Includes Kanyakumari, Nagercoil, Tamil Nadu per metadata spec. */
  description:
    'Latest Kanyakumari news today, Nagercoil updates and Kanyakumari district headlines from Tamil Nadu — breaking news, politics, tourism and more.',
  locale: 'en_IN',
  alternateLocale: 'ta_IN',
  twitterHandle: '@kanyakumaritoday', // TODO: audit found this is a placeholder — confirm real handle
  logo: `${SITE_URL}/logo.png`,
  /* TODO: og-image.jpg does NOT exist on disk yet (audit §5.7). Create a real
     1200x630 image before relying on this for OG/Twitter cards. */
  defaultOgImage: `${SITE_URL}/og-image.jpg`,
  geo: {
    /* Coordinates verified against index.html geo.position (8.0883;77.5385). */
    lat: 8.0883,
    lng: 77.5385,
    region: 'IN-TN',
    placename: 'Kanyakumari, Tamil Nadu, India',
  },
  /* Official social profile URLs. Audit §5.1 confirms these are currently
     placeholders in index.html. TODO: owner to fill with real profile URLs. */
  sameAs: [
    // 'https://www.facebook.com/kanyakumaritoday',   // TODO
    // 'https://twitter.com/kanyakumaritoday',        // TODO
    // 'https://www.youtube.com/@kanyakumaritoday',   // TODO
    // 'https://www.instagram.com/kanyakumaritoday',  // TODO
  ],
  /* Contact details read from src/pages/Contact.jsx (NOT invented). Audit §10
     flagged: confirm these are the intended public NAP values. */
  contact: {
    email: 'kanyakumaritoday2026@gmail.com',
    phone: '+918870005541',
    displayPhone: '88700 05541',
  },
  /* Google Search Console verification token preserved from index.html. */
  googleSiteVerification: 'NxxrDNw42FGmfOHpXggbBkJhrimufkWYAmHcWU8Bbms',
};

/* ---------------------------------------------------- Meta keywords (root)
 * Re-exported so metadata code imports everything from one place.
 * Google ignores meta keywords, but other crawlers may read them. Keep short. */
export { META_KEYWORDS };

/* ------------------------------------------ AI + search crawler allow-list
 * Used by the robots rule builder (Step 4). Every crawler below gets an
 * explicit "Allow: /" so answer engines and search bots can reach all public
 * content. AI-training bots are gated by ALLOW_AI_TRAINING_BOTS below.
 */
export const AI_AND_SEARCH_BOTS = [
  'Googlebot',
  'Googlebot-News',
  'Googlebot-Image',
  'Bingbot',
  'DuckDuckBot',
  'Applebot',
  'YandexBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'Claude-SearchBot',
  'Claude-User',
  'ClaudeBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Amazonbot',
  'Meta-ExternalAgent',
  'FacebookBot',
  'DuckAssistBot',
  'MistralAI-User',
  'cohere-ai',
  'YouBot',
  'CCBot',
];

/* The training-crawler subset that becomes "Disallow: /" when this is false.
 * Set true (the prompt default) to ALLOW answer engines to index content,
 * which is required for the AEO/GEO goal. NOTE: this reverses the current
 * robots.txt that blocks GPTBot/CCBot/anthropic-ai/Claude-Web — see audit §5.3. */
export const ALLOW_AI_TRAINING_BOTS = true;

export const AI_TRAINING_BOTS = [
  'GPTBot',
  'ClaudeBot',
  'anthropic-ai',
  'CCBot',
  'Google-Extended',
  'Applebot-Extended',
  'Meta-ExternalAgent',
];
