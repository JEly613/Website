---
title: Project Structure
inclusion: always
---

# Project Structure

## Directory Layout

```
/app
  layout.tsx                    ← root layout: nav + footer, font loading, CSS vars
  page.tsx                      ← homepage (redirects to /about or acts as About)
  /about/page.tsx
  /notes/page.tsx               ← notes index: lists all subjects as cards
  /notes/[subject]/page.tsx     ← subject overview: lists chapters
  /notes/[subject]/[chapter]/page.tsx  ← individual note page with sidebar
  /photography/page.tsx
  /blog/page.tsx                ← blog listing, sorted by date
  /blog/[slug]/page.tsx         ← individual post
  /contact/page.tsx

/content
  /notes/                       ← MDX files: subject/chapter-slug.mdx
    /classical-mechanics/
      chapter-1-newtonian.mdx
      chapter-2-lagrangian.mdx
    /electromagnetism/
      ...
  /blog/                        ← MDX files: slug.mdx
    my-first-post.mdx

/components
  /layout/
    Nav.tsx                     ← top navigation bar
    Footer.tsx
  /notes/
    NotesSidebar.tsx            ← nested chapter/topic tree nav
    NotesLayout.tsx             ← wraps note pages with sidebar
  /photography/
    PhotoGrid.tsx               ← masonry grid
    Lightbox.tsx                ← full-screen photo viewer
  /blog/
    PostCard.tsx                ← card for blog listing page
    PostHeader.tsx              ← title, date, tags, reading time
  /ui/
    Tag.tsx                     ← reusable tag/badge component
    Button.tsx

/lib
  mdx.ts                        ← MDX parsing and rendering utilities
  notes.ts                      ← build notes content tree from /content/notes
  blog.ts                       ← read blog posts + frontmatter, sort by date

/public
  /photos/                      ← photography images organized by series
  /og/                          ← OG images for social sharing

/styles
  globals.css                   ← CSS variable definitions, base resets, KaTeX styles
```

## Naming Conventions
- Components: PascalCase (`PostCard.tsx`)
- Utilities/lib: camelCase (`mdx.ts`)
- MDX content files: kebab-case (`chapter-1-newtonian.mdx`)
- URL slugs: kebab-case derived from filenames

## Server vs Client Components
- Default to **server components** for all pages and layouts
- Add `"use client"` only when the component needs: state, event handlers, browser APIs, or hooks
- Examples of client components: `NotesSidebar.tsx` (active state), `Lightbox.tsx`, contact form

## Static Generation
- Use `generateStaticParams` for all dynamic routes (`/notes/[subject]/[chapter]`, `/blog/[slug]`)
- All MDX content pages must be statically generated at build time
