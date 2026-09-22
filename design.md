# Design — EDMA 产品官网

A locked design system for this app. Every page redesign reads this file before
emitting code. Do not regenerate per page — extend or amend this file when the
system needs to grow.

## Genre
modern-minimal

## Macrostructure family
- Marketing pages: Catalogue (product family index, card grid, search)
- Product pages: Long Document (overview, modules, capabilities, related)
- Content pages: Long Document

## Theme
Slate. Cool institutional ink with a restrained teal accent. Tokens live in `tokens.css`. Do not swap theme per page.

## Typography
- Display / Body: Geist
- Display tracking: -0.04em to -0.055em
- Type scale: `--text-display` on home hero, `--text-2xl` on product titles

## Spacing
4-point named scale in `tokens.css`. Use named tokens only.

## Motion
- Easings: `--ease-out`, `--ease-in`, `--ease-in-out`
- Product menu is a floating panel: fade, rise, and slight scale. Family columns stagger on enter.
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
- Wordmark EDMA, Slate accent, Geist, pill CTAs, sticky search nav

## What pages MAY differ on
- Home is a catalogue of families. Product pages are long-form capability docs.
