# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 portfolio/service website for Olsen3D, built with React 19, TypeScript, and CSS Modules. The site showcases services in 3D modeling, ICT setup, and 3D printing with a client-side theme toggle (dark/light mode).

## Development Commands

```bash
# Start development server with Turbopack (faster builds)
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm start

# Run linter
pnpm run lint
```

The dev server runs at http://localhost:3000

## Architecture

### Directory Structure

```
src/
├── app/
│   ├── components/        # All UI components (Header, Hero, Services, Portfolio, Contact, Footer)
│   ├── portfolio/[id]/    # Dynamic project detail pages
│   ├── tjenester/         # Static service category pages (3d-modellering, ikt-setup, 3d-utskrift)
│   ├── layout.tsx         # Root layout with font loading and ThemeProvider
│   ├── page.tsx           # Home page (server component)
│   ├── providers.tsx      # Client component wrapping next-themes ThemeProvider
│   ├── page.module.css    # ALL component styles (centralized)
│   └── globals.css        # CSS variables and global resets
├── data/
│   └── projects.ts        # Centralized project data with TypeScript interface
└── public/                # Static assets (images, logos)
```

### Key Architectural Patterns

1. **Server-Side Rendering for Home Page**: The home page (`src/app/page.tsx`) is a server component. Only the Header component is client-side (for theme toggle and scroll detection).

2. **Static Generation for Content Pages**: Category pages (`/tjenester/*`) and project detail pages (`/portfolio/[id]`) are statically generated at build time using Next.js App Router features.

3. **Centralized Styling**: All component styles are in a single file (`src/app/page.module.css`, 608 lines) using CSS Modules. No Tailwind or CSS-in-JS.

4. **Theme System**: Uses `next-themes` library (industry-standard) with CSS variables and `[data-theme="dark"]` selector:
   - `ThemeProvider` from `next-themes` wraps the app in `src/app/providers.tsx`
   - Theme state managed automatically (handles SSR, localStorage, system preference)
   - Header component uses `useTheme` hook from `next-themes`
   - Icons from `lucide-react` (no external CDN dependencies)

### Data Flow

```
src/data/projects.ts (source of truth)
    ↓
Category pages filter by project.category
    ↓
Dynamic detail pages render via generateStaticParams()
```

All project data is defined in `src/data/projects.ts` with this interface:

```typescript
interface Project {
  id: string;        // URL slug for /portfolio/[id]
  title: string;
  category: string;  // Filter key: '3d-modellering' | 'ikt-setup' | '3d-utskrift'
  summary: string;
  thumbnail: string;
  images: string[];
  description: string;
}
```

### Routing Strategy

- **Home**: `/` - Server-rendered landing page with client-side Header
- **Service Categories**: `/tjenester/[category-name]/` - Static pages with hardcoded category filters
- **Project Details**: `/portfolio/[id]/` - Dynamic route with `generateStaticParams()` for static generation

**Important**: Category pages are NOT dynamic routes (not `/tjenester/[category]/`). Each category has its own directory with identical filtering logic. This allows per-category customization but creates code duplication.

## TypeScript Configuration

Path alias configured in `tsconfig.json`:
```typescript
"paths": {
  "@/*": ["./src/*"]
}
```

Use `@/components/Header` instead of `../../components/Header`.

## Styling System

- **CSS Modules**: Component-scoped class names via `page.module.css`
- **CSS Variables**: Theme colors defined in `:root` and `[data-theme="dark"]`
- **Global Styles**: Base styles and resets in `globals.css`
- **Responsive Design**: CSS Grid with media queries at 992px, 768px, and 480px breakpoints

All colors use CSS variables (`var(--bg-color)`, `var(--text-color)`, etc.) to support theme switching.

## Image Optimization

All images use Next.js Image component:
```typescript
import Image from 'next/image';

<Image
  src="/path/to/image.png"
  alt="Description"
  width={500}
  height={200}
/>
```

Only the hero image has `priority` prop for above-the-fold optimization.

## Known Limitations

1. **Contact Form**: The form in `src/app/components/Contact.tsx` has HTML inputs but no submit handler or API route. It is not functional.

2. **No API Routes**: No `/api` directory exists. All data is static.

3. **Code Duplication**: The three category pages (`tjenester/3d-modellering`, `tjenester/ikt-setup`, `tjenester/3d-utskrift`) have identical structure and could be refactored to a single dynamic route.

4. **Services Component**: Service cards are hardcoded HTML, not driven by data like projects.

## Adding New Projects

Edit `src/data/projects.ts`:

```typescript
export const projects: Project[] = [
  {
    id: "unique-slug",           // Used in URL /portfolio/unique-slug
    title: "Project Title",
    category: "3d-modellering",  // Must match existing category
    summary: "Short description",
    thumbnail: "/image.png",     // Path relative to /public
    images: ["/image.png"],
    description: "Full HTML description"
  },
  // ... existing projects
];
```

The project will automatically appear:
- In the matching category page (`/tjenester/[category]`)
- As a static detail page at build time (`/portfolio/[id]`)

## Component Locations

All components are in `src/app/components/`:
- [Header.tsx](src/app/components/Header.tsx) - Navigation, theme toggle, scroll detection (client component)
- [Hero.tsx](src/app/components/Hero.tsx) - Hero banner (server component)
- [Services.tsx](src/app/components/Services.tsx) - Service cards (server component, hardcoded)
- [Portfolio.tsx](src/app/components/Portfolio.tsx) - Portfolio category links (server component)
- [Contact.tsx](src/app/components/Contact.tsx) - Contact form (server component, non-functional)
- [Footer.tsx](src/app/components/Footer.tsx) - Footer with contact info (server component)

Only the Header component uses `"use client"`. All other components are server components.

## Font Loading

Fonts are loaded via Next.js font optimization in `layout.tsx`:
```typescript
import { Geist, Geist_Mono } from "next/font/google";
```

Fonts are available as CSS variables:
- `var(--font-geist-sans)`
- `var(--font-geist-mono)`

## Build Optimization

The site uses:
- **Turbopack** in development for faster rebuilds
- **Static generation** for all pages (home page is now server-rendered)
- **Image optimization** via Next.js Image component
- **Font optimization** via Next.js font loading
- **generateStaticParams()** in `/portfolio/[id]/page.tsx` to pre-render all project detail pages
- **next-themes** for zero-flash theme switching with SSR support

## Theme Implementation

The site uses `next-themes` for theme management:

1. **ThemeProvider**: Wraps the app in `src/app/providers.tsx` with `attribute="data-theme"`
2. **CSS Variables**: Theme colors defined in `src/app/globals.css`
   ```css
   :root {
     --bg-color: #f0f2f5;
     --text-color: #333;
     /* ... more variables */
   }

   [data-theme="dark"] {
     --bg-color: #1a1a1a;
     --text-color: #ffffff;
     /* ... dark theme overrides */
   }
   ```
3. **Theme Toggle**: Header component uses `useTheme` from `next-themes` to toggle between light/dark
4. **Icons**: Uses `lucide-react` icons (Moon and Sun) instead of Font Awesome

To change colors, edit the CSS variables in `globals.css`. The `next-themes` library handles persistence, system preference, and SSR automatically.
