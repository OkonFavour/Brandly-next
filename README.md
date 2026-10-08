# Brandly

A modern creative services marketplace built with Next.js App Router, TypeScript, and Tailwind CSS.

---

## Features

- Dynamic multi-market routing (`/ng`, `/us`, `/gb`, `/ca`) with automatic currency formatting
- Full service catalog with filtering by category and sorting by popularity or price
- Dedicated service detail pages with image galleries and turnaround specs
- Client-side cart state management persisted via `localStorage`
- Streamlined checkout and order confirmation workflows
- Fast bundling and live reloading powered by Turbopack

---

## Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

---

## Setup Instructions

### 1. Clone or Open the Repository

```bash
cd brandly-next
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The root page automatically redirects to the default market (`/ng`).

### 4. Build for Production

```bash
npm run build
```

### 5. Start the Production Server

```bash
npm run start
```

### 6. Lint the Codebase

```bash
npm run lint
```

---

## Key Decisions

### Next.js App Router Architecture
The application uses the App Router structure (`app/`) to organize routes around market parameters. The root path (`app/page.tsx`) redirects to `/ng`, while `app/[market]` houses shared layouts, headers, footers, and page views.

### Multi-Market Routing
Market localization is handled entirely through dynamic route parameters (`[market]`). The route validates the market code against supported regions (`ng`, `us`, `gb`, `ca`), enforcing localized currency display and pricing rules across all catalog and checkout screens.

### State Management
Cart state is managed via React Context in `context/cart.tsx`. Because cart items reflect immediate user interaction without server session requirements, state is synchronized directly with browser `localStorage`, keeping the architecture lightweight and client-accessible.

### Styling with Tailwind CSS v4
The project utilizes Tailwind CSS v4 with the `@tailwindcss/turbopack` loader configured inside `next.config.ts`. Global design tokens and typography are centralized in `app/globals.css`.

### Turbopack Root Anchoring
To prevent build warnings or path resolution issues when parent directories contain stray lockfiles, `turbopack.root` is explicitly set to `__dirname` in `next.config.ts`. This guarantees deterministic resolution for all project modules and CSS loaders.

### Centralized Data Modeling
Service catalog definitions, market pricing multipliers, and region specifications reside in `lib/data.ts`, providing a single source of truth for UI components, cart calculations, and metadata.
