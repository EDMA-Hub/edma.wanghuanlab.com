# Design — EDMA 产品官网

A locked design system for this app. Every page redesign reads this file before
emitting code. Do not regenerate per page — extend or amend this file when the
system needs to grow.

## Genre
modern-minimal

## Macrostructure family
- Marketing pages: Catalogue (five-suite index, 23-application card grid, search)
- Product pages: Long Document (overview, modules, capabilities, related)
- Content pages: Long Document

## Theme
Ledger, on branch `design/v3-ledger`. Cool gray paper, DM Mono codes, forest-green rules, two-column product cards and a contents hero. Folio is `design/v1-folio`. Press is `design/v2-press`. Overrides live in `src/ledger.css`.

- Background: deep navy `#0B0F1A` equivalent in OKLCH
- Surface: raised navy `#151A2B` equivalent in OKLCH
- Primary: indigo `#6366F1` equivalent in OKLCH
- Signal: cyan `#22D3EE` equivalent in OKLCH
- Primary text: `#F1F5F9` equivalent in OKLCH
- Secondary text: `#94A3B8` equivalent in OKLCH

## Typography
- Display / Body: Geist
- Display tracking: -0.04em to -0.055em
- Type scale: `--text-display` on home hero, `--text-2xl` on product titles

## Spacing
4-point named scale in `tokens.css`. Use named tokens only.

## Motion
- Easings: `--ease-out`, `--ease-in`, `--ease-in-out`
- Product menu is a floating panel: fade, rise, and slight scale. Family columns stagger on enter.
- Home hero uses a static grid with two slow indigo and cyan light orbs over a generated enterprise topology visual. Particle networks are not used.
- Product and section entrances use opacity + 16 px rise with scroll-driven progressive enhancement.
- Reduced motion removes spatial animation and keeps content immediately visible.
- Catalog navigation scrolls to `#catalog` on the home page. No separate catalog route.
- Reduced-motion: opacity-only, ≤ 150 ms

## Microinteractions stance
- silent success on demo form
- hover delay 800 ms · focus delay 0 ms
- command palette is a primary product finder

## CTA voice
- Primary: filled teal pill, copy `预约演示`
- Secondary: outline pill, copy `查看产品`

## What pages MUST share
- Wordmark EDMA, Nocturne canvas, Geist, pill CTAs, sticky search nav.
- Every product uses its own 24 × 24 geometric icon on a shared rounded tile. The first shape carries a 16% fill; suites keep a stable hue: customer cyan, manufacturing indigo, supply blue, management slate, platform violet. Channel DMS and document EDMS stay distinct marks.
- Product screenshots, when replaced, are 3:2. Display size 1200 × 800. Source file 2400 × 1600.
- Glass is reserved for navigation, hero status surfaces, and overlays. Product cards use solid elevated surfaces.

## What pages MAY differ on
- Home is a catalogue of five product suites. Product pages are long-form capability docs.
- Marketing surfaces may use a generated or hand-built topology visual. Product pages use a deterministic 3:2 visual placeholder until real screenshots are available.
