# Keyword Tracker — Kanyakumari Today

**Purpose:** monthly ranking log sourced from Google Search Console.
Update this file at the start of each month. Do not edit page code here —
record changes in KEYWORD_PLAN.md and act in the source files.

Data window for initial baseline: **25 Sep – 24 Oct 2026** (home page only).
Source: `TIER1_DATA`, `SPELLING_VARIANTS`, `TAMIL_DATA`, `LIVE_AND_LOCAL_DATA`
in `src/seo/keywords.js`.

Legend:
- **Status** — `active` = being optimised | `top3` = reached position ≤3 (maintain) | `monitor` = impressions too low to act on yet | `suggested` = not yet measured in GSC
- **Action** — specific next step; `—` = no change needed this cycle
- **CTR** — click-through rate from GSC (clicks ÷ impressions × 100). Leave blank until GSC data is available.

---

## Section 1 — TIER1_DATA (measured, high priority)

> These 13 queries came directly from GSC. All rank 8–12 and have measurable
> impressions. Priority: get each to position ≤3.

| Keyword | Impressions | Position | CTR % | Target page | Status | Action | Last updated |
|---|---|---|---|---|---|---|---|
| kanyakumari news | 120 | 8.4 | — | `/` | active | Primary keyword in title ✅, in h1 ✅. Improve raw-HTML content (SSR plan). Monitor next cycle. | 2026-10-24 |
| kanyakumari news today | 111 | 8.2 | — | `/` | active | Primary for homepage. Title ✅, h1 ✅, meta desc ✅. Push to top 3 via SSR + more article content. | 2026-10-24 |
| kanyakumari today news | 60 | 9.0 | — | `/` | active | Variant of primary. In title/h1/desc ✅. Same SSR action. | 2026-10-24 |
| today kanyakumari news | 40 | 10.0 | — | `/` | active | Word-order variant. No dedicated action — same page as primary. | 2026-10-24 |
| kanyakumari today | 20 | 2.6 | — | `/` | top3 | Already position 3. Brand query — protect. Ensure brand name in title suffix ✅. | 2026-10-24 |
| today kanyakumari | 16 | 3.1 | — | `/` | top3 | Position 3. Same brand-query protection. | 2026-10-24 |
| today news kanyakumari | 14 | 8.3 | — | `/` | active | Word-order variant. No dedicated change needed beyond homepage improvement. | 2026-10-24 |
| kanyakumari news today live | 13 | 12.1 | — | `/` | active | "Live" intent. Position 12 = page 2. Consider adding a live-update ticker label (visible text proposal needed). | 2026-10-24 |
| kanyakumari district news today | 11 | 8.1 | — | `/` | active | In meta desc and category meta. SSR is the main lever. | 2026-10-24 |
| kanyakumari district news | 10 | 8.5 | — | `/` | active | In meta desc ✅. Same SSR action. | 2026-10-24 |
| kanyakumari local news | 8 | 8.3 | — | `/` | active | Covered by homepage. No per-page change. | 2026-10-24 |
| nagercoil news today | 8 | 11.8 | — | `/` | active | In title ✅. Position 12 = page 2. `/nagercoil` town hub page would help (in SEO_PROPOSALS.md). | 2026-10-24 |
| nagercoil news | 7 | 9.4 | — | `/` | active | In title ✅. Same action as above. | 2026-10-24 |

---

## Section 2 — SPELLING_VARIANTS (measured, real queries)

> Real user searches — not in GSC as tracked queries yet but confirmed real.
> Impressions and position are blank until next GSC export includes them.
> Use each once, naturally, in footer text (see spelling-variant proposal in SEO_PROPOSALS.md).

| Keyword | Impressions | Position | CTR % | Target page | Status | Action | Last updated |
|---|---|---|---|---|---|---|---|
| kanya kumari news | — | — | — | `/` | monitor | Use once in footer text proposal ✅ (awaiting OK). Do not add to title. | 2026-10-24 |
| kaniyakumari news | — | — | — | `/` | monitor | Same as above. Footer natural mention only. | 2026-10-24 |
| kanniyakumari news | — | — | — | `/` | monitor | Same as above. | 2026-10-24 |
| kumari news today | — | — | — | `/` | monitor | Same as above. | 2026-10-24 |
| kumari news | — | — | — | `/` | monitor | Same as above. | 2026-10-24 |

---

## Section 3 — TAMIL_DATA (real queries, low competition)

> Tamil-script queries confirmed real. Small volume, low competition.
> GSC may show them under the Tamil filter; export with language filter off.

| Keyword | Impressions | Position | CTR % | Target page | Status | Action | Last updated |
|---|---|---|---|---|---|---|---|
| கன்னியாகுமரி மாவட்ட செய்திகள் | — | — | — | `/` | monitor | Tamil h1 in noscript fallback ✅. Language toggle in header ✅. Monitor CTR once measured. | 2026-10-24 |
| கன்னியாகுமரி மாவட்ட இன்றைய செய்திகள் | — | — | — | `/` | monitor | Same page, same action. | 2026-10-24 |
| குமரி மாவட்ட செய்திகள் | — | — | — | `/` | monitor | Natural variant. No dedicated page action. | 2026-10-24 |
| நாகர்கோவில் இன்றைய செய்திகள் | — | — | — | `/nagercoil` | monitor | Nagercoil hub page proposed (SEO_PROPOSALS.md) — approve to act. | 2026-10-24 |
| கன்னியாகுமரி செய்திகள் | — | — | — | `/` | monitor | In noscript Tamil paragraph ✅. | 2026-10-24 |

---

## Section 4 — LIVE_AND_LOCAL_DATA (real + suggested)

> Mix of confirmed real ("nagercoil news today live") and suggested intent queries.
> "Suggested" = not yet measured; fill from GSC when they appear with ≥5 impressions.

| Keyword | Impressions | Position | CTR % | Target page | Status | Action | Last updated |
|---|---|---|---|---|---|---|---|
| nagercoil news today live | — | — | — | `/nagercoil` | monitor | Town hub page needed (SEO_PROPOSALS.md). | 2026-10-24 |
| kanyakumari district today news live | — | — | — | `/` | monitor | "Live" intent. Consider live-ticker proposal. | 2026-10-24 |
| kanyakumari school news today live | — | — | — | `/category/education` | monitor | Education category page + SSR needed first. | 2026-10-24 |
| local news near me today | — | — | — | `/` | monitor | Generic local-intent query. Will rank if geo signals improve (JSON-LD areaServed ✅). | 2026-10-24 |
| kanyakumari news paper today | — | — | — | `/e-paper` | suggested | E-Paper page exists at `/e-paper`. Add metadata to that page. | 2026-10-24 |
| kanyakumari latest news | — | — | — | `/` | suggested | In meta desc ✅. No separate action. | 2026-10-24 |
| kanyakumari latest news today | — | — | — | `/` | suggested | Same. | 2026-10-24 |
| kanyakumari recent news | — | — | — | `/` | suggested | Same. | 2026-10-24 |

---

## Section 5 — Overflow (add new queries here each month)

> When a new query appears in GSC with ≥5 impressions, add it here first.
> Move to the relevant section above after the second month of data.

| Keyword | Impressions | Position | CTR % | Target page | Status | Action | Last updated |
|---|---|---|---|---|---|---|---|
| *(empty — fill from next GSC export)* | | | | | | | |

---

## Monthly routine

Run this at the **start of each month**, after the previous month's GSC data is
complete (GSC data lags ~3 days; wait until the 5th).

### Step 1 — Export from Google Search Console

1. Open [Google Search Console](https://search.google.com/search-console) →
   select property `https://www.kanyakumaritoday.com/`
2. Go to **Performance → Search results**
3. Set date range: **last 28 days** (or full previous calendar month)
4. **No page filter** — leave the Queries tab showing all queries
5. Columns: Clicks, Impressions, CTR, Position (all four ticked)
6. Click **Export → Download CSV**
7. Open the CSV and sort by **Impressions descending**

### Step 2 — Update this file

For each row in the CSV:

| Condition | Action |
|---|---|
| Query already in a table above | Update Impressions, Position, CTR, Last updated |
| Query is new and has ≥5 impressions | Add to Section 5 |
| Query has <5 impressions | Skip for now; re-check next month |
| Position moved from >3 to ≤3 | Change Status to `top3`; change Action to "Maintain — check title/h1 still correct, no changes needed" |
| Position was ≤3 last month, now >3 | Change Status back to `active`; add recovery action |
| CTR is <1 % and position ≤5 | Flag for title/description A/B test in KEYWORD_PLAN.md |
| CTR is >5 % and position >5 | Flag as strong intent signal — prioritise pushing this page up |

### Step 3 — Categorise new queries from Section 5

After adding them, decide the target page:
- Contains a town name → town hub page (or `/` until hub is built)
- Contains a category name (education, tourism, cinema…) → that category page
- Brand query (includes "kanyakumari today") → `/`
- Live intent ("live", "today", "now") → homepage or relevant category
- Question format → flag for AEO (add to SEO_PROPOSALS.md FAQ section)

Then move to the correct section (1–4) and set initial Status to `monitor`.

### Step 4 — Act on `active` keywords

For each `active` keyword where position improved this month:
1. Check the target page's title, h1, and description match the keyword in
   KEYWORD_PLAN.md
2. If position improved without a change → note "organic improvement, no action"
3. If a change was made → check it's deployed (verify via URL Inspection in GSC)
4. If position is stuck ≥8 for 3 consecutive months → escalate to SSR or new
   content (add to SEO_PROPOSALS.md)

### Step 5 — Protect `top3` keywords

For each `top3` keyword:
1. Confirm the target page still exists and returns HTTP 200
2. Confirm the keyword is still in the `<title>` (use URL Inspection → "View
   tested page")
3. Confirm no recent title/h1 change accidentally removed the keyword
4. If position slipped back above 3 → move to `active` and investigate

### Step 6 — Monthly check on brand queries

Brand queries (`kanyakumari today`, `kanyakumari today news`) rank near position
3. Each month confirm:
- `<title>` still ends with `| Kanyakumari Today` ✅
- Organization JSON-LD `name` is still `"Kanyakumari Today"` ✅
- `alternateName` list in JSON-LD is unchanged ✅
- `llms.txt` `Cite as:` line is unchanged ✅
- No 5xx errors on the homepage (check Core Web Vitals report)

### Step 7 — Record the date

Update the **baseline date** comment at the top of this file each month:
```
Data window: [previous month start] – [previous month end]
```

---

## Quick reference — GSC position benchmarks

| Position | Meaning | Typical action |
|---|---|---|
| 1–3 | Top 3 — high visibility | Maintain: protect title/h1, monitor CTR |
| 4–7 | Page 1 but low | Improve CTR: test title wording; check meta description |
| 8–10 | Bottom of page 1 | Improve content depth, add internal links, try SSR |
| 11–20 | Page 2 | Same as 8–10 plus consider dedicated landing page |
| >20 | Deep pages | Only act if impressions ≥20; otherwise deprioritise |

---

## Files related to this tracker

| File | Purpose |
|---|---|
| `src/seo/keywords.js` | Source of truth for all keyword data |
| `KEYWORD_PLAN.md` | Per-page title/h1/description assignments |
| `SEO_PROPOSALS.md` | Pending content changes (town hubs, FAQs, SSR) |
| `INDEXING_DIAGNOSIS.md` | Technical audit: why pages may not index |
| `public/sitemap.xml` | Submitted to GSC; must match real backend categories |
| `public/llms.txt` | AI crawler identity file |
