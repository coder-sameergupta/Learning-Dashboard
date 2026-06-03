# Luminary — Next-Gen Learning Dashboard

A high-fidelity student dashboard built with Next.js 15 App Router, Supabase, Framer Motion, and Tailwind CSS.

---

## Architecture Decisions

### Server vs Client Component Split

The key principle: fetch data on the server, animate on the client.

- **`app/dashboard/page.tsx`** — Server Component. Wraps the async `CourseData` component in a `<Suspense>` boundary. Nothing here ships JS to the browser.
- **`CourseData` (inline async RSC)** — Runs `createClient()` from `lib/supabase/server.ts` and queries the `courses` table. Passes the result as plain props to the client `BentoGrid`.
- **`components/dashboard/bento-grid.tsx`** — Client Component. Receives courses as props and orchestrates Framer Motion stagger animations.
- **`components/dashboard/course-card.tsx`** — Client Component. Needs `whileHover` and the in-view progress bar animation.
- **`components/dashboard/sidebar.tsx`** — Client Component. Manages `active` nav state and layoutId animations.
- **`components/dashboard/activity-tile.tsx`** — Client Component. Framer Motion entrance animations per cell.
- **`components/dashboard/hero-tile.tsx`** — Client Component (could be server, but kept client for potential future interactivity).
- **`components/dashboard/skeletons.tsx`** — Server Component. Pure CSS pulse, no JS needed.

### Why No Context / Custom Hooks

The dashboard is a single-page prototype. Global state management (Zustand, Context) would be overengineering. The only stateful thing is sidebar active nav — local `useState` is the right call.

### Animation Strategy

All animations exclusively use `transform` (scale, translateY) and `opacity` — zero layout shifts, zero browser repaints. Framer Motion's `layoutId="sidebar-active"` handles the sliding highlight with a spring transition, matching the spec exactly.

Progress bars use an in-view trigger (`useInView`) so they animate when they enter the viewport, not eagerly on page load.

### Supabase Client Architecture

Two separate clients:
- `lib/supabase/server.ts` — Uses `@supabase/ssr`'s `createServerClient` with the Next.js cookie store. Safe for Server Components and Route Handlers.
- `lib/supabase/client.ts` — Uses `createBrowserClient`. Available if you add client-side mutations later.

The anon key is intentionally public (`NEXT_PUBLIC_`). Row-level security on Supabase handles authorization.

---

## Component Hierarchy

```
app/dashboard/page.tsx (Server)
├── Sidebar (Client)
└── Suspense
    └── CourseData (Server, async)
        └── BentoGrid (Client)
            ├── HeroTile (Client)
            ├── CourseCard × N (Client)
            │   └── ProgressBar (Client)
            └── ActivityTile (Client)
```

---

## Supabase Setup

### 1. Create a project

Go to [supabase.com](https://supabase.com) → New project.

### 2. Run the schema SQL

```sql
create table public.courses (
  id          uuid primary key default gen_random_uuid(),
  title       text        not null,
  progress    integer     not null default 0 check (progress between 0 and 100),
  icon_name   text        not null default 'BookOpen',
  created_at  timestamptz not null default now()
);

alter table public.courses enable row level security;

create policy "Public read access"
  on public.courses for select
  using (true);
```

### 3. Seed data

```sql
insert into public.courses (title, progress, icon_name) values
  ('Advanced React Patterns',    75, 'Atom'),
  ('TypeScript Deep Dive',       42, 'Code2'),
  ('System Design Fundamentals', 88, 'Network'),
  ('CSS Architecture & Design',  20, 'Palette');
```

### 4. Get your keys

Settings → API → copy `Project URL` and `anon public` key.

---

## Environment Variables

```bash
# .env.local (never commit this)
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

---

## Local Development

```bash
npm install
cp .env.example .env.local  # fill in your Supabase values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/dashboard`.

---

## Deployment (Vercel)

1. Push to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Add environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in the Vercel dashboard.
4. Deploy. No special build config needed — Next.js is auto-detected.

---

## Performance Considerations

- **Server Components** eliminate client-side data fetching waterfalls. The HTML arrives with course data already embedded.
- **`Suspense` streaming** lets the sidebar render immediately while courses load.
- **Framer Motion animations** are hardware-accelerated via `transform`/`opacity` only.
- **Font loading** uses `display=swap` to avoid FOIT.
- **No unnecessary JS** — skeleton loaders are pure CSS (`animate-pulse`).

---

## Known Tradeoffs

- **Static user profile** — `USER` is hardcoded in `page.tsx`. In a real app this comes from `supabase.auth.getUser()`.
- **No optimistic updates** — This is a read-only prototype; mutations aren't needed.
- **Tailwind purge** — `icon_name` values are dynamically resolved via object lookup, not Tailwind classes, so there's no purge issue.
