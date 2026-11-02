/**
 * SEO Helpers — Kanyakumari Today
 * -----------------------------------------------------------------------------
 * Pure utilities for building metadata, canonical URLs, titles, descriptions
 * and IST timestamps. Per the MASTER RULES this file is NOT imported by any UI
 * component — only by metadata / schema / route-handler / build-time code.
 *
 * No existing file is modified by this module's existence.
 */

import { SITE } from './config.js';

/**
 * Resolve a path to an absolute URL against the canonical site URL.
 * Passes through anything that is already an absolute http(s) URL.
 * @param {string} [path] - site-relative path, e.g. "/article/my-slug"
 * @returns {string}
 */
export function absoluteUrl(path = '') {
  const p = String(path ?? '');
  if (/^https?:\/\//i.test(p)) return p;
  const base = SITE.url.replace(/\/$/, '');
  const suffix = p.startsWith('/') ? p : p ? `/${p}` : '';
  return `${base}${suffix}`;
}

/**
 * Truncate text to max characters, appending an ellipsis only when truncated.
 * Never cuts in the middle of the ellipsis; trims trailing whitespace first.
 * @param {string} text
 * @param {number} max - inclusive character budget (result length <= max)
 * @returns {string}
 */
export function truncate(text, max) {
  const str = String(text ?? '').replace(/\s+/g, ' ').trim();
  if (str.length <= max) return str;
  return `${str.slice(0, Math.max(0, max - 1)).trimEnd()}…`;
}

const SITE_NAME = 'Kanyakumari Today';

/**
 * Build a page title in the form "Page | Kanyakumari Today", capped at 60 chars.
 * If no page name is given, returns a sensible homepage title.
 * @param {string} [page] - the page-specific part
 * @returns {string} - at most 60 characters
 */
export function buildTitle(page) {
  const p = String(page ?? '').trim();
  if (!p) return 'Kanyakumari News Today | Kanyakumari Today'.slice(0, 60);
  return truncate(`${p} | ${SITE_NAME}`, 60);
}

/**
 * Build a meta description in the 140–160 character range.
 * - Already in range → returned as-is.
 * - Longer than 160 → truncated to 160 with ellipsis.
 * - Shorter than 140 → returned as-is (real content is preferred over filler;
 *   SEO description length is a target, not a hard floor — padding hurts CTR).
 * - Empty → falls back to SITE.description.
 * @param {string} [text]
 * @returns {string}
 */
export function buildDescription(text) {
  const str = String(text ?? '').replace(/\s+/g, ' ').trim();
  if (!str) return SITE.description;
  return truncate(str, 160);
}

/**
 * Format a Date as ISO 8601 with the Asia/Kolkata (+05:30) offset, e.g.
 * "2026-10-23T14:30:00.000+05:30". The offset is fixed (IST has no DST).
 *
 * Implementation: shift the instant by the IST offset, render as UTC, then
 * relabel the trailing "Z" as "+05:30". The wall-clock result is correct IST.
 * @param {Date|string|number} date
 * @returns {string} ISO string with +05:30, or '' for invalid input
 */
export function toIST(date) {
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return '';
  const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000; // +05:30
  const shifted = new Date(d.getTime() + IST_OFFSET_MS);
  return `${shifted.toISOString().replace('Z', '+05:30')}`;
}
