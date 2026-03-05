---
title: Technology Stack
inclusion: always
---

# Technology Stack

## Core Framework
- **Next.js 14** with App Router (`/app` directory) — use server components by default
- **TypeScript** throughout — no plain `.js` files except config files (`next.config.js`, `tailwind.config.ts`)
- **Tailwind CSS** for all styling — no CSS modules, no CSS-in-JS, no styled-components

## Content
- **MDX** via `next-mdx-remote` or `@next/mdx` for Notes and Blog posts
- **remark-math** + **rehype-katex** for LaTeX math rendering in physics notes
- All content is file-based — no database, no CMS

## Key Libraries
- `next/image` — all images, no raw `<img>` tags ever
- `next/font` — font loading only (no Google Fonts `<link>` tags)
- `react-masonry-css` or CSS columns — photography grid layout
- `yet-another-react-lightbox` — photo lightbox
- `gray-matter` — MDX frontmatter parsing
- `reading-time` — estimated read time for blog posts
- Resend or Formspree — contact form email (no custom API routes needed)
- `zod` — frontmatter validation

## Fonts
- Load via `next/font/google` only
- Choose a distinctive display/heading font paired with a refined body font
- Never use: Inter, Roboto, Arial, system-ui, or any generic sans-serif defaults
- Good pairings to consider: Fraunces + DM Sans, Playfair Display + Lato, Cormorant + Source Sans 3

## Deployment
- **Vercel** — deploy from GitHub, zero config needed for Next.js

## What NOT to Use
- No UI component libraries (no MUI, Chakra, Ant Design, shadcn/ui) — build all components from scratch with Tailwind
- No CSS-in-JS
- No pages router — App Router only
- No dark mode
- No raw `<img>` tags
- No hardcoded hex colors — always use CSS variables
