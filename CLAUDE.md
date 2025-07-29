# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` or `pnpm dev` - Start development server with Turbopack
- `npm run build` - Build for production  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Architecture

This is a Next.js 15 portfolio website for Olsen3D using the App Router with TypeScript and CSS Modules.

### Core Structure
- `/src/app/` - Next.js App Router pages and layouts
- `/src/app/shared/components/` - Reusable components (Header, Footer)
- `/src/app/home/components/` - Home page specific components
- `/src/app/hooks/` - Custom React hooks
- `/src/data/` - Static data and TypeScript interfaces
- `/public/` - Static assets including project images

### Key Features
- **Theme System**: Custom light/dark theme implementation using CSS custom properties and `data-theme` attribute on `<html>`. Theme state managed via `useTheme` hook with localStorage persistence.
- **Hydration Handling**: Uses `useHasMounted` hook to prevent hydration mismatches, especially for theme-dependent rendering.
- **Portfolio System**: Dynamic portfolio with categories (3D modeling, ICT setup, 3D printing) defined in `/src/data/projects.ts`. Each category contains projects with dedicated detail pages at `/portfolio/[id]`.
- **Image Organization**: Project images stored in `/public/3d Prints/` with organized subdirectories.

### Component Patterns
- CSS Modules for styling with `.module.css` convention
- Client components use `"use client"` directive
- Font Awesome loaded dynamically via CDN in main page component
- Scroll-based header styling handled via DOM manipulation

### Data Structure
Projects are organized into categories with TypeScript interfaces:
- `Project` interface with id, title, summary, thumbnail, images, description
- `Category` interface containing multiple projects
- Exported arrays: `modelProjects`, `iktProjects`, `printProjects`, `categories`

### Styling Approach
- CSS custom properties for theming
- Geist font family (sans and mono variants)
- Responsive design with CSS Grid and Flexbox
- CSS Modules prevent style conflicts