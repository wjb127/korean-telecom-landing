# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important Instructions

### Task Completion Notification
When completing any task or set of modifications requested by the user, always run the `notify` command in the terminal to send a notification. This helps the user know when work is complete.

```bash
notify
```

Run this command after:
- Completing code modifications
- Finishing a feature implementation
- Resolving bugs
- Any other task completion

## Project Overview

Korean telecom service landing page built with Next.js 15 App Router, TypeScript, and Tailwind CSS v4. The application features a lead generation form with Supabase backend integration and an admin dashboard for lead management.

## Tech Stack

- **Framework**: Next.js 15.2.4 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with @tailwindcss/postcss
- **UI Components**: shadcn/ui components with Radix UI primitives
- **Forms**: react-hook-form with zod validation
- **Database**: Supabase (PostgreSQL)
- **Testing**: Jest with React Testing Library
- **Package Manager**: npm (based on package-lock.json presence)

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Environment Configuration

Required environment variables (see .env.local for reference):
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (server-side only)
- `ADMIN_PASSWORD` - Password for admin dashboard access

## Application Architecture

### Pages & Routes
- `/` - Main landing page with lead generation form
- `/thank-you` - Post-submission confirmation page
- `/admin` - Password-protected admin dashboard for lead management
- `/api/submit-lead` - API endpoint for form submission
- `/api/admin/leads` - API endpoint for admin lead operations (GET, DELETE)

### Key Components
- **`app/page.tsx`**: Main landing page with hero section, features, pricing, and integrated lead form
- **`components/testimonial-carousel.tsx`**: Auto-scrolling testimonial component with 4-second intervals
- **`components/admin-dashboard.tsx`**: Lead management interface with CSV export functionality
- **`lib/supabase.ts`**: Supabase client configuration and type definitions

### Key Features
1. **Lead Generation Form**: Collects name, phone, carrier selection, and service type
2. **Supabase Integration**: Stores leads with IP address and user agent tracking
3. **Admin Dashboard**: View, export (CSV), and delete leads with password protection
4. **Form Validation**: Client-side validation using zod schemas
5. **Responsive Design**: Mobile-optimized with hamburger menu navigation
6. **Testimonial Carousel**: Auto-scrolling customer testimonials with manual navigation

### Database Schema
The Supabase `leads` table includes:
- `id` (auto-increment primary key)
- `name`, `phone`, `carrier`, `service` (form fields)
- `created_at` (timestamp)
- `ip_address`, `user_agent` (tracking metadata)

## Testing Strategy

Jest is configured with:
- Test environment: jsdom
- Setup file: `jest.setup.js` (includes @testing-library/jest-dom and mock env vars)
- Path alias support: `@/*` maps to project root
- Coverage collection from app/, components/, and lib/ directories

## Build Configuration Notes

- Next.js config has ESLint and TypeScript errors disabled during builds (`ignoreDuringBuilds: true`, `ignoreBuildErrors: true`)
- Images are set to unoptimized mode
- TypeScript path alias `@/*` points to project root for clean imports

## Important Styling Notes

- Mobile-first responsive design with Tailwind breakpoints (sm, md, lg)
- Purple color scheme (#7C3AED) used as primary brand color
- Hero text uses `whitespace-nowrap` to prevent unwanted line breaks on mobile
- Navigation includes mobile hamburger menu that slides in from the right

## Assets

Key image assets in `/public`:
- `hero.png` - Hero section background
- `spi.png` - CTA section background
- `art1.png`, `art2.png`, `art3.png` - Feature illustrations
- `money-icon.png`, `headset-icon.png`, `shield-icon.png` - Service icons