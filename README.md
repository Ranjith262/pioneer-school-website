# Pioneer Public School — Website

A modern, premium, responsive, SEO-friendly website for **Pioneer Public School**, Koppal, Karnataka. Built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion.

> Learning Today. Leading Tomorrow.

## Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run lint       # ESLint
```

No database or external service is required to run the site — it works fully out of the box with a local content layer and branded placeholder imagery.

## Tech Stack

| Layer      | Choice                                   |
| ---------- | ---------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack)       |
| Language   | TypeScript (strict)                      |
| Styling    | Tailwind CSS v4 (design tokens in `app/globals.css`) |
| Animation  | Framer Motion (respects reduced motion)  |
| Validation | Zod (server-side, in Server Actions)     |
| Database   | PostgreSQL + Prisma (schema included, wiring optional) |
| Fonts      | Poppins (headings) + Inter (body) via `next/font` |

## Project Structure

```
app/                 Routes (App Router)
  page.tsx           Homepage (hero, stats, programs, testimonials, …)
  about/             History, vision/mission, values, faculty
  academics/         Program listing + /academics/[slug] detail pages
  admissions/        Process, eligibility, documents, FAQs, forms
  campus-life/       Sports, arts, clubs, house system, tours
  gallery/           Filterable gallery with lightbox
  achievements/      Awards and results
  news/              Searchable news list + /news/[slug] articles
  parents/           Downloads & resources, future parent portal
  contact/           Contact cards, form, Google Map
  privacy-policy/
  sitemap.ts         Generated sitemap.xml
  robots.ts          Generated robots.txt
components/
  layout/            AnnouncementBar, Navbar, Footer, MobileCta
  home/              Testimonials carousel, AchievementsSlider
  gallery/           GalleryExplorer (filters + lightbox)
  forms/             EnquiryForm, ContactForm, VisitForm, NewsletterForm
  motion/            FadeIn / Stagger / CountUp animation primitives
  ui/                Button, Container, SectionHeading, Accordion, …
content/             All sample content (site info, programs, news, …)
lib/                 Server Actions (zod-validated), utilities
prisma/              schema.prisma (PostgreSQL models)
types/               Shared TypeScript interfaces
```

## Content Editing

All site content lives in `content/*.ts` as typed data — edit those files to change programs, news, events, achievements, testimonials, gallery items, FAQs, and school details (`content/site.ts` holds name, address, phone, email, social links, and the announcement bar).

This local content layer is intentionally shaped like CMS collections. To move to a headless CMS (Sanity/Strapi/Payload) later, replace the imports in pages with CMS fetches — the types in `types/index.ts` define the contract.

## Forms

Four forms (admission enquiry, contact, campus visit, newsletter) are implemented with **Server Actions** + **Zod validation** + **honeypot spam protection** and accessible inline error states.

Submissions currently log server-side in `lib/actions.ts` (`persistSubmission`). To store them in PostgreSQL:

1. Set `DATABASE_URL` in `.env` (copy `.env.example`).
2. `npm install @prisma/client && npx prisma migrate dev`
3. Replace `persistSubmission` with Prisma calls — the models in `prisma/schema.prisma` map 1:1 to each form.
4. Optionally add SMTP email notifications using the `SMTP_*` variables.

## Images

The site ships with branded gradient placeholders (`components/ui/ImagePlaceholder.tsx`) so it looks complete without photography. When real photos are available:

- Hero: 1920×1080 · Gallery: 1200×900 · Cards: 800×600
- Use authentic school photography, export as WebP/AVIF
- Replace `<ImagePlaceholder>` usages with `next/image` `<Image>` components (alt text is already modelled — the `label` prop)

## SEO

- Per-page titles/descriptions, canonical URLs, Open Graph, Twitter Cards
- Schema.org `School` structured data (in `app/layout.tsx`)
- `sitemap.xml` and `robots.txt` generated from `app/sitemap.ts` / `app/robots.ts`
- Set the production domain in `content/site.ts` (`url`) before launch

## Accessibility

- Skip-to-content link, semantic landmarks, correct heading hierarchy
- Keyboard-accessible menu, accordion, gallery lightbox (Esc/arrow keys)
- Visible focus states, `aria-*` on all interactive widgets
- All animation respects `prefers-reduced-motion`

## Deployment

**Vercel (recommended):** import the repo, framework auto-detected, add env vars from `.env.example` (only `NEXT_PUBLIC_SITE_URL` is needed until the database is wired). Every push deploys.

**Self-hosted:** `npm run build && npm start` behind Nginx/Caddy with HTTPS. Security headers (HSTS, nosniff, frame options, referrer/permissions policy) are configured in `next.config.ts`.

Pre-launch checklist:

1. Replace placeholder phone numbers/emails in `content/site.ts`
2. Set the real Google Maps embed URL in `content/site.ts`
3. Point `url` in `content/site.ts` at the live domain
4. Replace image placeholders with real photography
5. Review privacy policy text

## Future Expansion

The PRD's future features (parent portal, fee payment, attendance, AI assistant) have a clear path: the Prisma schema already includes `User`/`Role` models for NextAuth-based logins, and the folder structure separates content, UI, and server logic for clean growth.
