# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
- **Package Manager**: pnpm (based on pnpm-lock.yaml presence)

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm run start

# Run linting
pnpm run lint

# Run tests
pnpm run test

# Run tests in watch mode
pnpm run test:watch

# Run tests with coverage
pnpm run test:coverage
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

### Key Features
1. **Lead Generation Form**: Collects name, phone, carrier selection, and service type
2. **Supabase Integration**: Stores leads with IP address and user agent tracking
3. **Admin Dashboard**: View, export (CSV), and delete leads with password protection
4. **Form Validation**: Client-side validation using zod schemas
5. **Responsive Design**: Mobile-optimized with hamburger menu navigation

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