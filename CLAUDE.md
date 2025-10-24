# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 portfolio/service website for Olsen3D, built with React 19, TypeScript, CSS Modules, and MDX. The site showcases services in 3D printing, 3D modeling (CAD), IT support, IKT setup, and courses, with a portfolio of completed projects. Features include dark/light theme toggle and a functional contact form via Formspree.

## Development Commands

```bash
# Start development server with webpack (required for MDX plugins)
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm start

# Run linter
pnpm run lint
```

The dev server runs at http://localhost:3000

**Note**: This project uses webpack instead of Turbopack because the MDX plugins (remarkGfm, rehypeHighlight) cannot be serialized for Turbopack. This is a known limitation in Next.js 16.

## Architecture

### Directory Structure

```
src/
├── app/
│   ├── api/
│   │   ├── projects/route.ts  # API route for fetching all projects
│   │   └── services/route.ts  # API route for fetching all services
│   ├── components/             # All UI components
│   │   ├── Header.tsx          # Navigation, theme toggle (client component)
│   │   ├── Hero.tsx            # Hero banner (server component)
│   │   ├── Services.tsx        # Services section (server component)
│   │   ├── FeaturedProjects.tsx # Featured projects (server component)
│   │   ├── Contact.tsx         # Contact form with Formspree (client component)
│   │   └── Footer.tsx          # Footer (server component)
│   ├── prosjekter/             # Projects pages
│   │   ├── page.tsx            # All projects overview with filtering (client component)
│   │   └── [slug]/page.tsx    # Dynamic project detail pages (server component)
│   ├── tjenester/              # Services pages
│   │   ├── page.tsx            # All services overview (server component)
│   │   └── [slug]/page.tsx    # Dynamic service detail pages (server component)
│   ├── layout.tsx              # Root layout with font loading and ThemeProvider
│   ├── page.tsx                # Home page (server component)
│   ├── providers.tsx           # Client component wrapping next-themes ThemeProvider
│   ├── page.module.css         # ALL component styles (centralized, 1000+ lines)
│   └── globals.css             # CSS variables and global resets
├── content/                    # MDX content files (source of truth)
│   ├── services/               # Service MDX files
│   │   ├── 3d-printing.mdx
│   │   ├── 3d-modellering.mdx
│   │   ├── ikt-setup.mdx
│   │   ├── it-support.mdx
│   │   └── kursing.mdx
│   └── projects/               # Project MDX files
│       ├── dor-handtak-bobil.mdx
│       ├── garasje-port-apner-holder.mdx
│       ├── hengsel-traktor-vindu.mdx
│       ├── iphone-bakdeksel.mdx
│       ├── mini-disker.mdx
│       ├── stol-knott.mdx
│       └── toalett-skilt.mdx
├── lib/
│   └── mdx.ts                  # MDX utility functions for reading content
└── public/
    └── images/
        └── projects/           # Project images organized by folder
```

### Key Architectural Patterns

1. **MDX-Driven Content**: All services and projects are defined in MDX files with frontmatter metadata. This makes content easy to edit and enables future admin portal development.

2. **Server Components by Default**: Most components are server components (Hero, Services, FeaturedProjects, Footer). Only Header (theme toggle) and Contact (form handling) are client components.

3. **Static Generation**: Service and project detail pages use `generateStaticParams()` to pre-render all pages at build time for optimal performance.

4. **Dynamic Filtering**: The projects overview page (`/prosjekter`) is a client component that allows filtering projects by service category in real-time.

5. **Centralized Styling**: All component styles are in a single file ([src/app/page.module.css](src/app/page.module.css), 1000+ lines) using CSS Modules. No Tailwind or CSS-in-JS.

6. **Theme System**: Uses `next-themes` library with CSS variables and `[data-theme="dark"]` selector for seamless dark/light mode switching.

### Data Flow

```
src/content/{services|projects}/*.mdx (source of truth)
    ↓
src/lib/mdx.ts (utility functions)
    ↓
Components/Pages (consume MDX data)
    ↓
Static pages generated at build time
```

### MDX Content Structure

#### Service Frontmatter
```yaml
---
title: "Service Title"
description: "Short description"
icon: "LucideIconName"  # e.g., "Printer", "Box", "Monitor"
image: "/path/to/image.png"
---

# Service content in Markdown/MDX
```

#### Project Frontmatter
```yaml
---
title: "Project Title"
description: "Short description"
services: ["service-slug-1", "service-slug-2"]  # Links to services
images: ["/images/projects/folder/image.jpg"]  # Array of image paths
date: "2024-10-24"
featured: true  # Shows on home page if true
---

# Project content in Markdown/MDX
```

### Routing Strategy

- **Home**: `/` - Server-rendered landing page with FeaturedProjects
- **Services Overview**: `/tjenester` - All services with icons
- **Service Detail**: `/tjenester/[slug]` - Individual service page with related projects
- **Projects Overview**: `/prosjekter` - All projects with service-based filtering
- **Project Detail**: `/prosjekter/[slug]` - Individual project page with image gallery

All routes use Norwegian language (tjenester = services, prosjekter = projects).

## TypeScript Configuration

Path alias configured in `tsconfig.json`:
```typescript
"paths": {
  "@/*": ["./src/*"]
}
```

Use `@/lib/mdx` instead of `../../lib/mdx`.

## Styling System

- **CSS Modules**: Component-scoped class names via [page.module.css](src/app/page.module.css)
- **CSS Variables**: Theme colors defined in `:root` and `[data-theme="dark"]`
- **Global Styles**: Base styles and resets in [globals.css](src/app/globals.css)
- **Responsive Design**: CSS Grid with media queries at 768px breakpoint

All colors use CSS variables (`var(--bg-color)`, `var(--text-color)`, etc.) to support theme switching.

## Image Optimization

All images use Next.js Image component:
```typescript
import Image from 'next/image';

<Image
  src="/images/projects/folder/image.jpg"
  alt="Description"
  width={800}
  height={600}
/>
```

Project images are stored in `/public/images/projects/[project-folder]/`.

## MDX Utility Functions

Located in [src/lib/mdx.ts](src/lib/mdx.ts):

```typescript
// Get all services or projects
getAllServices(): Service[]
getAllProjects(): Project[]

// Get single service or project by slug
getServiceBySlug(slug: string): Service
getProjectBySlug(slug: string): Project

// Get projects filtered by service
getProjectsByService(serviceSlug: string): Project[]

// Get only featured projects
getFeaturedProjects(): Project[]
```

## Contact Form Integration

The contact form in [src/app/components/Contact.tsx](src/app/components/Contact.tsx) uses **Formspree** for form submissions:

```typescript
// Update with your Formspree form ID
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  body: data,
  headers: { Accept: 'application/json' },
});
```

**Setup**:
1. Create a free Formspree account at https://formspree.io
2. Create a new form and get your form ID
3. Replace `YOUR_FORM_ID` in Contact.tsx
4. Optionally enable Vercel integration for enhanced features

## Adding New Content

### Adding a New Service

1. Create a new MDX file in `src/content/services/`:
```mdx
---
title: "New Service"
description: "Service description"
icon: "Wrench"  # Any Lucide React icon name
image: "/service-image.png"
---

## Service Content
Your markdown content here...
```

2. The service will automatically appear on `/tjenester` and be available for project tagging.

### Adding a New Project

1. Add project images to `public/images/projects/[project-name]/`

2. Create MDX file in `src/content/projects/`:
```mdx
---
title: "New Project"
description: "Project description"
services: ["3d-printing", "3d-modellering"]  # Match service slugs
images: ["/images/projects/project-name/image1.jpg"]
date: "2024-10-24"
featured: false  # Set to true to show on home page
---

## Project Details
Your markdown content here...
```

3. Run `pnpm run build` to regenerate static pages.

## Component Locations

All components are in [src/app/components/](src/app/components):
- **Header.tsx** - Navigation, theme toggle, scroll detection (client component)
- **Hero.tsx** - Hero banner with call-to-action (server component)
- **Services.tsx** - Services grid with icons (server component)
- **FeaturedProjects.tsx** - Featured projects showcase (server component)
- **Contact.tsx** - Contact form with Formspree integration (client component)
- **Footer.tsx** - Footer with contact info (server component)

## Font Loading

Fonts are loaded via Next.js font optimization in [layout.tsx](src/app/layout.tsx):
```typescript
import { Geist, Geist_Mono } from "next/font/google";
```

Fonts are available as CSS variables:
- `var(--font-geist-sans)`
- `var(--font-geist-mono)`

## Build Optimization

The site uses:
- **Webpack** for builds (required for MDX plugin support)
- **Static generation** for all content pages via `generateStaticParams()`
- **Image optimization** via Next.js Image component
- **Font optimization** via Next.js font loading
- **MDX compilation** at build time for fast page loads with remarkGfm and rehypeHighlight plugins
- **next-themes** for zero-flash theme switching with SSR support

## Theme Implementation

The site uses `next-themes` for theme management:

1. **ThemeProvider**: Wraps the app in [src/app/providers.tsx](src/app/providers.tsx) with `attribute="data-theme"`
2. **CSS Variables**: Theme colors defined in [src/app/globals.css](src/app/globals.css)
3. **Theme Toggle**: Header component uses `useTheme` from `next-themes`
4. **Icons**: Uses `lucide-react` icons (Moon and Sun) for theme toggle

To change colors, edit the CSS variables in globals.css. The `next-themes` library handles persistence, system preference, and SSR automatically.

## Next.js 16 Compatibility

This project uses Next.js 16 with the following patterns:

- **Async Params**: Dynamic route params are Promises and must be awaited (required in Next.js 16):
  ```typescript
  export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    // Use slug...
  }
  ```

- **Server Components by Default**: Components are server components unless marked with `'use client'`

- **MDX Integration**: Uses `@next/mdx` with `next-mdx-remote/rsc` for server-side MDX rendering

- **Webpack Build**: Uses webpack (not Turbopack) because MDX plugins cannot be serialized for Turbopack

## Norwegian Language

The site is entirely in Norwegian (Bokmål):
- All UI text and content is in Norwegian
- URL slugs use Norwegian words (`tjenester`, `prosjekter`)
- MDX content should be written in Norwegian
- Date formatting uses Norwegian locale (`nb-NO`)

## Future Enhancements

The architecture supports future additions:
- **Admin Portal**: MDX-based content is ready for CMS integration
- **Search Functionality**: Content is structured for easy search implementation
- **More Services**: Easy to add new service types
- **Blog**: Can add a blog section using same MDX pattern
- **Multilingual**: Structure supports future language switching
