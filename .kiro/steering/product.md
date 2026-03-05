---
title: Product Overview
inclusion: always
---

# Personal Website — Product Overview

## Purpose
A personal website for showcasing work, sharing physics notes, photography, and writing. The site serves as a professional presence and a public knowledge base.

## Target Audience
- Potential employers or collaborators viewing the portfolio
- Students or curious readers browsing physics notes and blog posts
- Anyone interested in the photography work

## Sections
- **About** — Short bio and personal introduction
- **Notes** — Structured physics notes organized by subject, chapter, and topic. Renders LaTeX math. Designed for long-form reading.
- **Photography** — Personal photography portfolio with a masonry grid and lightbox
- **Blog** — Long-form writing and posts with tags and dates
- **Contact** — Simple contact form

## Design Philosophy
- Modern and minimalist — generous whitespace, clean typography, no visual clutter
- Light theme only
- The design should feel refined and intentional, not generic
- Typography and color choices are the primary aesthetic levers — use them carefully
- Let content breathe; avoid over-designed UI components

## Color Palette
All colors are defined as CSS variables in `globals.css`. Never hardcode hex values in components — always use the Tailwind mapped classes (`bg-bg`, `text-accent`, etc.).

| Variable | Value | Usage |
|---|---|---|
| `--bg` | #F3F8F2 | Main page background |
| `--surface` | #EBE9E9 | Cards, sidebars, code blocks |
| `--text` | #1a1a1a | Primary body text |
| `--text-muted` | #6b7280 | Captions, metadata, secondary text |
| `--accent` | #FCB07E | Links, active nav states, highlights |
| `--accent-2` | #3581B8 | Secondary accent, hover states |
| `--border` | #DEE2D6 | Dividers, input borders |
