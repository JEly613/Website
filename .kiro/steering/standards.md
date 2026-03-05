---
title: Content & Coding Standards
inclusion: always
---

# Content & Coding Standards

## MDX Frontmatter Schemas

### Blog Posts (`/content/blog/*.mdx`)
```yaml
---
title: "Post Title Here"
date: "2024-11-15"
description: "One sentence summary of the post."
tags: ["physics", "notes"]
published: true
---
```
- Only render posts where `published: true`
- Sort posts by `date` descending on the listing page
- Derive reading time from content using `reading-time` library

### Physics Notes (`/content/notes/subject/chapter.mdx`)
```yaml
---
title: "Lagrangian Mechanics"
subject: "Classical Mechanics"
chapter: 3
order: 1
---
```
- `chapter` and `order` are used to sort entries in the sidebar
- `subject` must match the parent folder name (normalized)

## LaTeX Math
- Inline math: `$E = mc^2$`
- Display math: `$$\int_a^b f(x)\,dx$$`
- Configure `remark-math` + `rehype-katex` in the MDX pipeline
- Import KaTeX CSS in `globals.css`: `@import 'katex/dist/katex.min.css'`
- Never use image-based math — always render with KaTeX

## Tailwind Usage
- All spacing, color, typography via Tailwind utility classes
- Colors via CSS variables mapped in `tailwind.config.ts`:
  ```ts
  colors: {
    bg: 'var(--bg)',
    surface: 'var(--surface)',
    text: { DEFAULT: 'var(--text)', muted: 'var(--text-muted)' },
    accent: { DEFAULT: 'var(--accent)', 2: 'var(--accent-2)' },
    border: 'var(--border)',
  }
  ```
- Use `text-text`, `bg-bg`, `text-accent`, `text-accent-2`, `bg-accent-2` etc. in JSX — never raw hex values

## TypeScript Standards
- No `any` types
- Define shared types in `/types/index.ts`
- Co-locate component-specific types with their file
- Use `zod` to validate MDX frontmatter at build time

## Accessibility
- All `next/image` components must have descriptive `alt` text
- Use semantic HTML: `<nav>`, `<main>`, `<article>`, `<section>`, `<header>`, `<footer>`
- Interactive elements must be keyboard navigable
- Color contrast must meet WCAG AA

## Section-Specific Rules

### Notes Sidebar
- Renders the full chapter/topic tree for the active subject
- Highlights the currently active note
- Must be a client component (`"use client"`) to track active state
- On mobile: collapses into a dropdown or drawer

### Photography Grid
- Use masonry layout (CSS columns or `react-masonry-css`)
- Lazy-load images with `next/image` using `loading="lazy"`
- Each photo opens a lightbox on click
- No heavy text overlays — keep it clean

### Blog Reading View
- Max width `max-w-2xl`, centered
- Body text `leading-relaxed text-lg`
- Show: title, date, tags, estimated reading time in post header
- Prose styles via Tailwind `prose` class (from `@tailwindcss/typography`)

### Contact Form
- Fields: Name, Email, Message
- Client-side validation before submit
- Show success and error states after submission
- Use Resend or Formspree — no custom backend API route needed

## Performance
- No large client-side bundles — minimize `"use client"` usage
- Photography images: use `next/image` with proper `sizes` attribute
- All dynamic MDX routes use `generateStaticParams` for static generation
