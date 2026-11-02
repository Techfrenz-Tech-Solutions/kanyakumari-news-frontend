# Keyword Plan — Kanyakumari Today

Source: `src/seo/keywords.js` — `PAGE_MAP`, `TIER1_DATA`
Density target: 1–2 % (primary keyword appears 1–2× per 100 words of page copy).
Title cap: 60 characters. Description: 140–160 characters.
Status: metadata ONLY applied now. Visible heading changes shown below — awaiting OK.

---

## Page map table

| Page | Primary keyword | Title (≤60 chars) | `<h1>` (current → proposed) |
|---|---|---|---|
| `/` | kanyakumari news today | Kanyakumari News Today \| Nagercoil Latest Updates ✅ already set | `sr-only` "Kanyakumari News Today: Latest Nagercoil and District Updates" ✅ already set |
| `/category/kanyakumari` | kanyakumari news today | Kanyakumari News Today – District Updates | `Kanyakumari News` → **"Kanyakumari News Today"** |
| `/category/tamilnadu-news` | tamil nadu news today | Tamil Nadu News Today \| Kanyakumari Today | `Tamil Nadu News` → **"Tamil Nadu News Today"** |
| `/category/national-news` | national news today | National News Today \| Kanyakumari Today | `National News` → **"National News Today"** |
| `/category/education` | kanyakumari education news | Kanyakumari Education News \| Updates | `Education News` → **"Kanyakumari Education News"** |
| `/category/tourism` | kanyakumari tourism news | Kanyakumari Tourism News & Travel Guide | `Tourism News` → **"Kanyakumari Tourism News"** |
| `/category/cinema` | tamil cinema news | Tamil Cinema News \| Kanyakumari Today | `Cinema` → **"Tamil Cinema News"** |
| `/category/sports` | kanyakumari sports news | Kanyakumari Sports News \| Latest Updates | `Sports` → **"Kanyakumari Sports News"** |
| `/article/:slug` | article headline keyword | [from article.seoTitle or article.title] ✅ already via `buildArticleMetadata` | [article.title] ✅ already rendered |

---

## Per-page full spec

### `/` — Home

- **Primary:** `kanyakumari news today` (TIER1: 111 impr, pos 8.2)
- **Supporting:** `kanyakumari news` (120 impr), `kanyakumari district news` (10 impr), `nagercoil news today` (8 impr)
- **Title:** `Kanyakumari News Today | Nagercoil Latest Updates` — 49 chars ✅
- **Description:** `Read the latest Kanyakumari and Nagercoil news today. Get local updates, Tamil Nadu headlines, education, tourism, cinema and sports news in one place.` — 151 chars ✅
- **`<h1>`:** `Kanyakumari News Today: Latest Nagercoil and District Updates` ✅
- **Proposed `<h2>` sections:** Breaking News · Latest Kanyakumari News Today · Tamil Nadu News · National News · Jobs in Kanyakumari · Kanyakumari Tourist Attractions
- **Status:** All metadata already applied. `<h2>` headings are visible text — in SEO_PROPOSALS.md, awaiting OK.

---

### `/category/kanyakumari`

- **Primary:** `kanyakumari news today` (TIER1: 111 impr, pos 8.2)
- **Supporting:** `kanyakumari news` · `kanyakumari district news` · `kanyakumari local news`
- **Title:** `Kanyakumari News Today – District Updates` — 41 chars
- **Description:** `Get the latest Kanyakumari news today — local district updates, breaking stories, politics, crime, education and more from Kanyakumari.` — 137 chars
- **`<h1>` current:** `Kanyakumari News` + t.newsWord (→ "Kanyakumari News")
- **`<h1>` proposed:** `Kanyakumari News Today` ← visible change, awaiting OK
- **Metadata:** ✅ Applied now (title + description via CATEGORY_META lookup)

---

### `/category/tamilnadu-news`

- **Primary:** `tamil nadu news today` (suggested, aligned with TIER1 regional intent)
- **Supporting:** `tamil nadu latest news` · `south tamil nadu news` · `kanyakumari today news`
- **Title:** `Tamil Nadu News Today | Kanyakumari Today` — 41 chars
- **Description:** `Read Tamil Nadu news today — the latest state politics, education, business and south Tamil Nadu headlines from Kanyakumari Today.` — 131 chars
- **`<h1>` current:** backend label "தமிழக செய்திகள்" (Tamil) or "tamilnadu-news" (EN fallback)
- **`<h1>` proposed:** `Tamil Nadu News Today` ← visible change, awaiting OK
- **Metadata:** ✅ Applied now

---

### `/category/national-news`

- **Primary:** `national news today` (suggested)
- **Supporting:** `india news today` · `india latest news` · `south india news`
- **Title:** `National News Today | Kanyakumari Today` — 39 chars
- **Description:** `Stay updated with national news today — India politics, government policies, economy and top India headlines from Kanyakumari Today.` — 133 chars
- **`<h1>` current:** backend label (Tamil) or "national-news" fallback
- **`<h1>` proposed:** `National News Today` ← visible change, awaiting OK
- **Metadata:** ✅ Applied now

---

### `/category/education`

- **Primary:** `kanyakumari education news` (CATEGORY_KEYWORDS + PAGE_MAP)
- **Supporting:** `kanyakumari school news today` · `exam results news` · `kanyakumari district news`
- **Title:** `Kanyakumari Education News | Latest Updates` — 43 chars
- **Description:** `Kanyakumari education news — school updates, exam results, college admissions and education policy from Kanyakumari district, Tamil Nadu.` — 138 chars
- **`<h1>` current:** "Education News" (displayLabel + t.newsWord)
- **`<h1>` proposed:** `Kanyakumari Education News` ← visible change, awaiting OK
- **Metadata:** ✅ Applied now

---

### `/category/tourism`

- **Primary:** `kanyakumari tourism news` (TIER1_DATA via BUSINESS/PAGE_MAP)
- **Supporting:** `kanyakumari tourist places` · `vivekananda rock ferry timings` · `kanyakumari travel guide`
- **Title:** `Kanyakumari Tourism News & Travel Guide` — 39 chars
- **Description:** `Kanyakumari tourism news — latest updates on Vivekananda Rock, Thiruvalluvar Statue, ferry timings, tourist spots and travel guides.` — 133 chars
- **`<h1>` current:** "Tourism News"
- **`<h1>` proposed:** `Kanyakumari Tourism News` ← visible change, awaiting OK
- **Metadata:** ✅ Applied now

---

### `/category/cinema`

- **Primary:** `tamil cinema news` (PAGE_MAP)
- **Supporting:** `kanyakumari cinema news` · `kollywood news today` · `tamil film news`
- **Title:** `Tamil Cinema News | Kanyakumari Today` — 37 chars
- **Description:** `Tamil cinema news today — latest Kollywood updates, movie releases, reviews and celebrity news from Kanyakumari Today.` — 119 chars
- **`<h1>` current:** "Cinema News"
- **`<h1>` proposed:** `Tamil Cinema News` ← visible change, awaiting OK
- **Metadata:** ✅ Applied now

---

### `/category/sports`

- **Primary:** `kanyakumari sports news` (PAGE_MAP)
- **Supporting:** `tamil nadu sports news` · `kanyakumari cricket news` · `sports news today`
- **Title:** `Kanyakumari Sports News | Latest Updates` — 39 chars
- **Description:** `Kanyakumari sports news — cricket, football, kabaddi and all sports updates from Kanyakumari district and Tamil Nadu, updated daily.` — 133 chars
- **`<h1>` current:** "Sports News"
- **`<h1>` proposed:** `Kanyakumari Sports News` ← visible change, awaiting OK
- **Metadata:** ✅ Applied now

---

### `/article/:slug`

- **Primary:** article headline keyword (from article data)
- **Supporting:** town name + topic (from article tags)
- **Title:** from `article.seo.seoTitle` or `article.title` ✅ already applied by `buildArticleMetadata`
- **Description:** from `article.seo.metaDescription` or `article.excerpt` ✅
- **`<h1>`:** `article.title` or `article.titleTA` ✅ already rendered in `Article.jsx`
- **Status:** fully handled — no change needed here

---

## Visible heading changes (awaiting your OK)

All `<h1>` changes below are in the dark header banner of each category page
(`bg-ink` background, white text). Only the text changes; tag, class and styling
are untouched.

| Page | Current `<h1>` | Proposed `<h1>` |
|---|---|---|
| `/category/kanyakumari` | Kanyakumari News | **Kanyakumari News Today** |
| `/category/tamilnadu-news` | [backend label] | **Tamil Nadu News Today** |
| `/category/national-news` | [backend label] | **National News Today** |
| `/category/education` | Education News | **Kanyakumari Education News** |
| `/category/tourism` | Tourism News | **Kanyakumari Tourism News** |
| `/category/cinema` | Cinema News | **Tamil Cinema News** |
| `/category/sports` | Sports News | **Kanyakumari Sports News** |

Reply **OK** to apply these heading changes, or adjust any line.

---

## What is applied now (no visible change)

- Per-slug `<title>` and `meta name="description"` via `CATEGORY_META` lookup in `Category.jsx`
- Self-referencing canonical per slug (already in place via `pageCanonical`)
- `<h1>` text stays at current value until you approve the table above
