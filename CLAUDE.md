# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application using TypeScript and Tailwind CSS v4 for a Korean telecom service landing page. The project uses the new App Router architecture and includes a comprehensive UI component library based on shadcn/ui.

## Tech Stack

- **Framework**: Next.js 15.2.4 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with @tailwindcss/postcss
- **UI Components**: shadcn/ui components with Radix UI primitives
- **Forms**: react-hook-form with zod validation
- **Package Manager**: pnpm (based on pnpm-lock.yaml presence)

## Common Development Commands

```bash
# Install dependencies (use pnpm)
pnpm install

# Start development server
pnpm run dev
# or
npm run dev

# Build for production
pnpm run build

# Start production server
pnpm run start

# Run linting
pnpm run lint
```

## Project Structure

- `/app` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with Geist font configuration
  - `page.tsx` - Main landing page (client component)
  - `globals.css` - Global styles with Tailwind directives
- `/components` - React components
  - `/ui` - shadcn/ui component library (40+ components)
  - `theme-provider.tsx` - Theme context provider
- `/lib` - Utility functions and helpers
  - `utils.ts` - Common utilities including cn() for className merging
- `/hooks` - Custom React hooks
- `/public` - Static assets and images

## Architecture Notes

1. **Component Library**: The project uses shadcn/ui components installed via the components.json configuration. All UI components are in `/components/ui` and use Radix UI primitives for accessibility.

2. **Styling System**: Tailwind CSS v4 is configured with PostCSS. The project uses CSS variables for theming and the `cn()` utility from `/lib/utils` for conditional className management.

3. **Form Handling**: The main page demonstrates form handling with react-hook-form, managing state for a telecom service signup form with fields for name, phone, carrier selection, and service type.

4. **Path Aliases**: TypeScript is configured with `@/*` path alias pointing to the project root, allowing imports like `@/components/ui/button`.

5. **Build Configuration**: The next.config.mjs has ESLint and TypeScript errors disabled during builds (ignoreDuringBuilds: true, ignoreBuildErrors: true), and images are unoptimized.

## Development Guidelines

- Use pnpm as the package manager
- Components should be client-side by default (use "use client" directive)
- Utilize existing UI components from `/components/ui` before creating new ones
- Follow the existing pattern for form handling with react-hook-form
- Use the `cn()` utility for conditional classNames
- Tailwind classes should be used for styling